import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        enrollmentNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        isAdmin:{
            type: Boolean,
            required: true,
            default: false,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "alumni"],
            default: "student",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        city: {
            type: String,
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            // required: true,
            default: "",
        },
        interests: {
            type: [String],
            default: [],
        },
        events: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        registeredEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event",
            },
        ],
        registeredAdminEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: "AdminEvent",
            },
        ],
        communities: [
            {
                type: Schema.Types.ObjectId,
                ref: "community",
            },
        ],
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
