import { Router } from "express";
import { editDoctorProfile, getDoctorById, getDoctors } from "../controller/doctor.controller.js";
import { verifyJWT, verifyRole } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/")
    .get(getDoctors)

router
    .route("/profile")
    .put(verifyJWT, verifyRole("doctor"), editDoctorProfile);

router
    .route("/:id")
    .get(getDoctorById)

export default router;