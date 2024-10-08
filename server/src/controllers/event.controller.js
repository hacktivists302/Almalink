import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEvent = asyncHandler(async (req, res) => {
    const role = req.user.role;

    if (role === "student") {
        throw new ApiError(403, "You are not authorized to create event");
    }

    const { title, description, startDate, endDate, startTime, endTime } =
        req.body;
    const userId = req.user._id;
    const university = req.user.university;

    console.log(req.body);

    if (!title || !description || !startDate || !endDate || !startTime) {
        throw new ApiError(400, "All fields are required");
    }

    let coverImageLocalPath;

    if (req.file) {
        coverImageLocalPath = req.file.path;
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    const event = await Event.create({
        title,
        description,
        owner: userId,
        university,
        startDate,
        endDate,
        startTime,
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
    const userId = req.user._id;

    const university = await User.findById(userId).select("university");

    const events = await Event.find({ university }).sort({ createdAt: -1 });
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

    if (event.isCompleted === true) {
        throw new ApiError(400, "Event is completed");
    }

    if (event.university !== user.university) {
        throw new ApiError(
            400,
            "You are not allowed to register to this event"
        );
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

const getUserEvents = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("registeredEvents");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user.registeredEvents));
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

const getUserUnregisterdEvents = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("university");

    const university = user.university;

    const events = await Event.find({
        university,
        registedUsers: { $ne: userId },
    });

    return res.status(200).json(new ApiResponse(200, events));
});

const completeEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

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
    createEvent,
    getAllEvents,
    getEvent,
    registerUserToEvent,
    unregisterUserFromEvent,
    isUserRegistered,
    getUserEvents,
    getUserUnregisterdEvents,
    completeEvent,
};
