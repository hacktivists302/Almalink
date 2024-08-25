import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while genrating refresh and access token"
        );
    }
};

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, university, password } = req.body;

    if (!email || !university || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        throw new ApiError(400, "Admin already exists");
    }

    const admin = await Admin.create({ email, university, password });

    const registeredAdmin = await Admin.findById(admin._id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                registeredAdmin,
                "Admin registered successfully"
            )
        );
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new ApiError(400, "User does not exists");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        admin._id
    );

    const loggedInAdmin = await Admin.findById(admin._id).select(
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
            new ApiResponse(200, loggedInAdmin, "User logged In Successfully")
        );
});

const logoutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
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

const getAllStudents = asyncHandler(async (req, res) => {
    const students = await User.find({
        role: "student",
        university: req.admin.university,
    }).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(200, students, "All students fetched successfully")
        );
});

const getAllAlumni = asyncHandler(async (req, res) => {
    const alumni = await User.find({
        role: "alumni",
        university: req.admin.university,
    }).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "All alumni fetched successfully"));
});

const getPendingApprovals = asyncHandler(async (req, res) => {
    const pendingApprovals = await User.find({
        status: "pending",
        role: "alumni",
        university: req.admin.university,
    }).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                pendingApprovals,
                "All pending approvals fetched successfully"
            )
        );
});

const approveAlumni = asyncHandler(async (req, res) => {
    const { alumniId } = req.params;

    const alumni = await User.findById(alumniId);

    if (!alumni) {
        throw new ApiError(404, "Alumni not found");
    }

    if (alumni.status === "approved") {
        throw new ApiError(400, "Alumni already approved");
    }

    alumni.status = "approved";

    await alumni.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni approved successfully"));
});

const denyAlumni = asyncHandler(async (req, res) => {
    const { alumniId } = req.params;

    const alumni = await User.findById(alumniId);

    if (!alumni) {
        throw new ApiError(404, "Alumni not found");
    }

    if (alumni.status === "denied") {
        throw new ApiError(400, "Alumni already denied");
    }

    alumni.status = "denied";

    await alumni.save({ validateBeforeSave: false });

    await User.findByIdAndDelete(alumniId);

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni denied successfully"));
});

const removeStudent = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const student = await User.findById(studentId);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    await student.findByIdAndDelete(studentId);

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student removed successfully"));
});

const removeAlumni = asyncHandler(async (req, res) => {
    const { alumniId } = req.params;

    const alumni = await User.findById(alumniId);

    if (!alumni) {
        throw new ApiError(404, "Alumni not found");
    }

    await alumni.findByIdAndDelete(alumniId);

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni removed successfully"));
});

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAllStudents,
    getAllAlumni,
    getPendingApprovals,
    approveAlumni,
    denyAlumni,
    removeStudent,
    removeAlumni,
};
