import {
    createPost,
    getAllPosts,
    togglePostLike,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(upload.single("image"), createPost);
router.route("/").get(getAllPosts);
router.route("/:postId/like").put(togglePostLike);

export default router;
