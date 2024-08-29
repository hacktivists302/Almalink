import {
    createEvent,
    getAllEvents,
    getEvent,
    registerUserToEvent,
    unregisterUserFromEvent,
    isUserRegistered,
    getUserEvents,
    getUserUnregisterdEvents,
    completeEvent,
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllEvents);
router.route("/create").post(upload.single("coverImage"), createEvent);
router.route("/my-events").get(getUserEvents);
router.route("/unregistered").get(getUserUnregisterdEvents);
router.route("/:eventId").get(getEvent);
router.route("/:eventId/register").post(registerUserToEvent);
router.route("/:eventId/unregister").post(unregisterUserFromEvent);
router.route("/:eventId/isRegistered").get(isUserRegistered);
router.route("/:eventId/complete").put(completeEvent);

export default router;
