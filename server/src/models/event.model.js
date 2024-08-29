import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        coverImage: {
            type: String,
            required: true,
        },
        registedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
