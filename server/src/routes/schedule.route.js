import { Router } from "express";

const router = Router();

router
    .route("/")
    .post(createSchedule)

router
    .route("/:scheduleId")
    .put(editSchedule)
// .delete(deleteSchedule)

router   /// available slots
    .route("/doctor/:doctorId")
    .get(getScheduleByDrId)

export default router;
