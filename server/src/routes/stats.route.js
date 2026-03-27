import { Router } from "express";
import { getDoctorStats, getPatientStats } from "../controller/stats.controller.js";
import { verifyJWT, verifyRole } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/doctor")
    .get(verifyJWT, verifyRole("doctor"), getDoctorStats);

router
    .route("/patient")
    .get(verifyJWT, verifyRole("patient"), getPatientStats);

export default router;

