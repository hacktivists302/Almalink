import {
    createAdminEvent,
    getAllAdminEvents,
    getAdminEvent,
    registerUserToAdminEvent,
    unregisterUserFromAdminEvent,
    getUserAdminEvents,
    getUserUnregisteredAdminEvents,
    completeAdminEvent,
} from "../controllers/adminEvent.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyAdmin);

router.route("/").get(getAllAdminEvents);
router.route("/create").post(upload.single("coverImage"), createAdminEvent);
router.route("/my-events").get(getUserAdminEvents);
router.route("/unregistered").get(getUserUnregisteredAdminEvents);
router.route("/:eventId").get(getAdminEvent);
router.route("/:eventId/register").post(registerUserToAdminEvent);
router.route("/:eventId/unregister").post(unregisterUserFromAdminEvent);
router.route("/:eventId/complete").put(completeAdminEvent);

export default router;
