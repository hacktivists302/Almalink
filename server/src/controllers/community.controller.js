import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Community } from "../models/community.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCommunity = asyncHandler(async (req, res) => {
    const role = req.user.role;
    if (role == "student") {
        throw new ApiError(403, "You are not authorized to create community");
    }

    const { name } = req.body;
    const userId = req.user._id;

    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    let imageUrlLocalPath;
    if (req.file) {
        imageUrlLocalPath = req.file.path;
    }

    console.log(imageUrlLocalPath);

    const imageUrl = await uploadOnCloudinary(imageUrlLocalPath);

    if (!imageUrl) {
        throw new ApiError(500, "Image file is required");
    }

    const community = await Community.create({
        name,
        admin: userId,
        members: [userId],
        imageUrl: imageUrl.url,
    });

    if (!community) {
        throw new ApiError(
            500,
            "Something went wrong while creating community"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, community, "Community created successfully")
        );
});

const getAllCommunities = asyncHandler(async (req, res) => {
    const communities = await Community.find().sort({ createdAt: -1 });
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                communities,
                "Communities fetched successfully"
            )
        );
});

const addCommunityPost = asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;
    const { title, content } = req.body;

    const community = await Community.findById(communityId);

    if (!community) {
        throw new ApiError(404, "Community not found");
    }

    if (!community.members.includes(userId)) {
        throw new ApiError(400, "You are not a member of this community");
    }

    const post = await Post.create({
        owner: userId,
        title,
        content,
        type: "community",
        community: communityId,
    });

    community.posts.push(post._id);

    await community.save({ validateBeforeSave: false });

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created successfully"));
});

const getCommunityPosts = asyncHandler(async (req, res) => {
    const { communityId } = req.params;

    const community = await Community.findById(communityId).populate("posts");

    if (!community) {
        throw new ApiError(404, "Community not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                community.posts,
                "Community posts fetched successfully"
            )
        );
});

const togglePostLike = asyncHandler(async (req, res) => {
    const { communityId, postId } = req.params;
    const userId = req.user._id;

    const community = await Community.findById(communityId);

    if (!community) {
        throw new ApiError(404, "Community not found");
    }

    if (!community.members.includes(userId)) {
        throw new ApiError(400, "You are not a member of this community");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const user = await User.findById(userId);

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
        post.likes.pull(userId);
        user.likedPosts.pull(postId);
    } else {
        post.likes.push(userId);
        user.likedPosts.push(postId);
    }

    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Post liked toggled successfully"));
});

const joinCommunity = asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;

    const community = await Community.findById(communityId);

    if (!community) {
        throw new ApiError(404, "Community not found");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (community.members.includes(userId)) {
        throw new ApiError(400, "You are already a member of this community");
    }

    community.members.push(userId);
    user.communities.push(communityId);

    await community.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Joined community successfully"));
});

const leaveCommunity = asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;

    const community = await Community.findById(communityId);

    if (!community) {
        throw new ApiError(404, "Community not found");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!community.members.includes(userId)) {
        throw new ApiError(400, "You are not a member of this community");
    }

    community.members.pull(userId);
    user.communities.pull(communityId);

    await community.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Left community successfully"));
});

export {
    createCommunity,
    getAllCommunities,
    addCommunityPost,
    togglePostLike,
    getCommunityPosts,
    joinCommunity,
    leaveCommunity,
};
