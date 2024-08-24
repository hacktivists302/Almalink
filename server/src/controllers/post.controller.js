import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;

    if (!title || !content) {
        throw new ApiError(400, "All fields are required");
    }

    const post = await Post.create({
        title,
        content,
        owner: userId,
    });

    if (!post) {
        throw new ApiError(500, "Something went wrong while creating post");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ type: "normal" }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, posts));
});

const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

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
        .json(new ApiResponse(200, "Post like toggled successfully"));
});

export { createPost, getAllPosts, togglePostLike };
