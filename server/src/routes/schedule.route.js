import { Router } from "express";
import { createSchedule, deleteSchedule, editSchedule, getScheduleByDrId } from "../controller/schedule.controller.js";
import { verifyJWT, verifyRole } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/")
    .post(verifyJWT, verifyRole("doctor"), createSchedule)

router
    .route("/:scheduleId")
    .put(verifyJWT, verifyRole("doctor"), editSchedule)
    .delete(verifyJWT, verifyRole("doctor"), deleteSchedule)

router   /// available slots
    .route("/doctor/:doctorId")
    .get(getScheduleByDrId)

export default router;
