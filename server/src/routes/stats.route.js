import { Router } from "express";

const router = Router();

router
    .route("/doctor")
    .get(getDoctorStats)

router
    .route("/patient")
    .get(getPatientStats)

export default router;

