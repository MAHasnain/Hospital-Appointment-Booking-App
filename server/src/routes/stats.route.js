import { Router } from "express";
import { getDoctorStats, getPatientStats } from "../controller/stats.controller.js";

const router = Router();

router
    .route("/doctor")
    .get(getDoctorStats)

router
    .route("/patient")
    .get(getPatientStats)

export default router;

