import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["normal", "community"],
            default: "normal",
            required: true,
        },
        community: {
            type: Schema.Types.ObjectId,
            ref: "Community",
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
