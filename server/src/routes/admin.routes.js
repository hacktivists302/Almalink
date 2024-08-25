import {
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
} from "../controllers/admin.controller.js";
import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

// secure routes
router.route("/logout").get(verifyAdmin, logoutAdmin);
router.route("/students").get(verifyAdmin, getAllStudents);
router.route("/alumni").get(verifyAdmin, getAllAlumni);
router.route("/pending").get(verifyAdmin, getPendingApprovals);
router.route("/approve/:alumniId").patch(verifyAdmin, approveAlumni);
router.route("/deny/:alumniId").patch(verifyAdmin, denyAlumni);
router.route("/remove/student/:studentId").delete(verifyAdmin, removeStudent);
router.route("/remove/alumni/:alumniId").delete(verifyAdmin, removeAlumni);

export default router;
