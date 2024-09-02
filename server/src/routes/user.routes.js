import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserProfilePic,
    getLikedPosts,
    getUserProfile,
    allUsers,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(upload.single("profilePic"), registerUser);

router.route("/:userId/verify-email/:token").get(verifyEmail);

router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/liked-posts").get(verifyJWT, getLikedPosts);

router
    .route("/profilePic")
    .patch(verifyJWT, upload.single("profilePic"), updateUserProfilePic);

router.route("/p/:userId").get(verifyJWT, getUserProfile);

router.route("/").get(verifyJWT, allUsers);

export default router;
