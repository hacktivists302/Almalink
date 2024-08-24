import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Follower } from "../models/follower.model.js";

const toggleFollow = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const followerId = req.user._id;

    if (userId == followerId) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    const follower = await Follower.findOne({
        follower: followerId,
        following: userId,
    });

    if (follower) {
        await Follower.findByIdAndDelete(follower._id);
        return res
            .status(200)
            .json(new ApiResponse(200, "Unfollowed successfully"));
    }

    await Follower.create({ follower: followerId, following: userId });

    return res.status(201).json(new ApiResponse(200, "Followed successfully"));
});

const getUserFollowers = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const followers = await Follower.find({ following: userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, followers, "Followers fetched successfully")
        );
});

const getUserFollowing = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const following = await Follower.find({ follower: userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, following, "Following fetched successfully")
        );
});

export { toggleFollow, getUserFollowers, getUserFollowing };
