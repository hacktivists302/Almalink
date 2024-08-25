import {
    createComment,
    getPostComments,
    updateComment,
    deleteComment,
} from "../controllers/comment.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/:postId").get(getPostComments).post(createComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;
