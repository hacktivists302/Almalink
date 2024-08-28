import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while genrating refresh and access token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone,
        password,
        role,
        city,
        university,
        enrollmentNumber,
        bio,
    } = req.body;

    console.log(req.body);

    if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !role ||
        !city ||
        !university ||
        !enrollmentNumber
    ) {
        throw new ApiError(400, "All fields are required");
    }

    User.findOne({ email }).then((existingUser) => {
        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }
    });

    let profilePicLocalPath;

    if (req.file) {
        profilePicLocalPath = req.file.path;
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    if (!profilePic) {
        throw new ApiError(500, "Profile pic file is required");
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
        city,
        university,
        enrollmentNumber,
        profilePic: profilePic.url,
        bio,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "email or password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exists found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User logged In Successfully")
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }, // this removes the field from the document
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(404, "Invalid refresh token");
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateUserProfilePic = asyncHandler(async (req, res) => {
    let profilePicLocalPath;

    console.log(req.file);

    if (req.file) {
        profilePicLocalPath = req.file.path;
    }

    if (!profilePicLocalPath) {
        throw new ApiError(400, "Profile pic file is required");
    }

    console.log(profilePicLocalPath);

    if (req.user?.profilePic) {
        const oldLink = req.user.profilePic.split("/");
        const publicId = oldLink[oldLink.length - 1].split(".")[0];
        console.log(publicId);
        await deleteFromCloudinary(publicId);
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    if (!profilePic.url) {
        throw new ApiError(400, "Error while uploading Profile pic");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { profilePic: profilePic.url },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Profile pic updated successfully"));
});

const getLikedPosts = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: req.user._id,
            },
        },
        {
            $lookup: {
                from: "posts",
                localField: "likedPosts",
                foreignField: "_id",
                as: "likedPosts",
            },
        },
        {
            $project: {
                likedPosts: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Liked posts fetched successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "followers",
                localField: "_id",
                foreignField: "follower",
                as: "following",
            },
        },
        {
            $lookup: {
                from: "followers",
                localField: "_id",
                foreignField: "following",
                as: "followers",
            },
        },
        {
            $addFields: {
                followersCount: { $size: "$followers" },
                followingCount: { $size: "$following" },
                isFollowing: {
                    $cond: {
                        if: {
                            $in: [req.user._id, "$followers.follower"],
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                name: 1,
                email: 1,
                phone: 1,
                role: 1,
                city: 1,
                university: 1,
                profilePic: 1,
                followersCount: 1,
                followingCount: 1,
                isFollowing: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserProfilePic,
    getLikedPosts,
    getUserProfile,
};
