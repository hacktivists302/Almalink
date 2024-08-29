import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AdminEvent } from "../models/adminEvent.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createAdminEvent = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate, startTime } = req.body;
    const university = req.admin.university;
    const owner = req.admin._id;

    if (!title || !description || !startDate || !endDate || !startTime) {
        throw new ApiError(400, "All fields are required");
    }

    let coverImageLocalPath;

    if (req.file) {
        coverImageLocalPath = req.file.path;
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    const event = await AdminEvent.create({
        title,
        description,
        startDate,
        endDate,
        startTime,
        coverImage: coverImage.url,
        owner,
        university,
    });

    if (!event) {
        throw new ApiError(500, "Something went wrong while creating event");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, event, "Event created successfully"));
});

const getAllAdminEvents = asyncHandler(async (req, res) => {
    const events = await AdminEvent.find({ owner: req.admin._id }).sort({
        createdAt: -1,
    });
    return res.status(200).json(new ApiResponse(200, events, "All events"));
});

const getAdminEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await AdminEvent.findById(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    return res.status(200).json(new ApiResponse(200, event, "Event"));
});

const registerUserToAdminEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const event = await AdminEvent.findById(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.isCompleted === true) {
        throw new ApiError(400, "Event is completed");
    }

    if (event.university !== user.university) {
        throw new ApiError(
            400,
            "You are not allowed to register to this event"
        );
    }

    if (event.registedUsers.includes(userId)) {
        throw new ApiError(400, "User already registered to this event");
    }

    event.registedUsers.push(userId);
    user.registeredAdminEvents.push(eventId);
    await event.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, event, "User registered successfully"));
});

const unregisterUserFromAdminEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const event = await AdminEvent.findById(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (!event.registedUsers.includes(userId)) {
        throw new ApiError(400, "User not registered to this event");
    }

    event.registedUsers.pull(userId);
    user.registeredAdminEvents.pull(eventId);
    await event.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, event, "User unregistered successfully"));
});

const getUserAdminEvents = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("registeredAdminEvents");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user.registeredAdminEvents));
});

const getUserUnregisteredAdminEvents = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const events = await AdminEvent.find({
        registedUsers: { $ne: userId },
    });

    return res.status(200).json(new ApiResponse(200, events));
});

const completeAdminEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await AdminEvent.findById(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    event.isCompleted = true;
    await event.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, event, "Event completed successfully"));
});

export {
    createAdminEvent,
    getAllAdminEvents,
    getAdminEvent,
    registerUserToAdminEvent,
    unregisterUserFromAdminEvent,
    getUserAdminEvents,
    getUserUnregisteredAdminEvents,
    completeAdminEvent,
};
