import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEvent = asyncHandler(async (req, res) => {
    const { type, title, description, startDate, endDate, startTime, endTime } =
        req.body;
    const userId = req.user._id;

    if (
        !type ||
        !title ||
        !description ||
        !startDate ||
        !endDate ||
        !startTime ||
        !endTime
    ) {
        throw new ApiError(400, "All fields are required");
    }

    let coverImageLocalPath;

    if (req.file) {
        coverImageLocalPath = req.file.path;
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    let location = req.body.location;
    if (!location) {
        location = "Online";
    }

    const event = await Event.create({
        type,
        title,
        description,
        owner: userId,
        startDate,
        endDate,
        location,
        startTime,
        endTime,
        coverImage: coverImage.url,
    });

    if (!event) {
        throw new ApiError(500, "Something went wrong while creating event");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, event, "Event created successfully"));
});

const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, events));
});

const getEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    return res.status(200).json(new ApiResponse(200, event));
});

const registerUserToEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isOwner = await Event.findOne({ _id: eventId, owner: userId });
    if (isOwner) {
        throw new ApiError(400, "You are the owner of this event");
    }

    if (event.registedUsers.includes(userId)) {
        throw new ApiError(400, "You are already registered to this event");
    }

    event.registedUsers.push(userId);
    user.registeredEvents.push(eventId);

    await event.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, event, "Registered successfully"));
});

const unregisterUserFromEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isOwner = await Event.findOne({ _id: eventId, owner: userId });
    if (isOwner) {
        throw new ApiError(400, "You are the owner of this event");
    }

    if (!event.registedUsers.includes(userId)) {
        throw new ApiError(400, "You are not registered to this event");
    }

    event.registedUsers.pull(userId);
    user.registeredEvents.pull(eventId);

    await event.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Unregistered successfully"));
});

const isUserRegistered = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.registedUsers.includes(userId)) {
        return res.status(200).json(new ApiResponse(200, true));
    }

    return res.status(200).json(new ApiResponse(200, false));
});

export {
    createEvent,
    getAllEvents,
    getEvent,
    registerUserToEvent,
    unregisterUserFromEvent,
    isUserRegistered,
};
