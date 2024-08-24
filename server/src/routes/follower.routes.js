import {
    toggleFollow,
    getUserFollowers,
    getUserFollowing,
} from "../controllers/follower.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/u/:userId").get(getUserFollowers).post(toggleFollow);
router.route("/f/:userId").get(getUserFollowing);

export default router;
