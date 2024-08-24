import mongoose, { Schema } from "mongoose";

const communitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        admin: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        imageUrl: {
            type: String,
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Community = mongoose.model("Community", communitySchema);
