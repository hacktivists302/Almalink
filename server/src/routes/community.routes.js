import {
    createCommunity,
    getAllCommunities,
    addCommunityPost,
    togglePostLike,
    getCommunityPosts,
    joinCommunity,
    leaveCommunity,
} from "../controllers/community.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllCommunities);
router.route("/").post(upload.single("imageUrl"), createCommunity);
router.route("/:communityId").get(getCommunityPosts);
router.route("/:communityId/post").post(addCommunityPost);
router.route("/:communityId/:postId/like").post(togglePostLike);
router.route("/:communityId/join").post(joinCommunity);
router.route("/:communityId/leave").post(leaveCommunity);

export default router;
