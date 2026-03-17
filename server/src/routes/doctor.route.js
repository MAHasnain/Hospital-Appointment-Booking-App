import { Router } from "express";
import { editDoctorProfile, getDoctorById, getDoctors } from "../controller/doctor.controller.js";

const router = Router();

router
    .route("/")
    .get(getDoctors)

router
    .route("/profile")
    .put(editDoctorProfile);

router
    .route("/:id")
    .get(getDoctorById)

export default router;