import { Router } from "express";

const router = Router();

router
    .route("/")
    .post(createAppointment)

router
    .route("/all")
    .get(getAllMyAppointments)

router
    .route("/doctor?date=today")
    .get(getPatientAppointments)

router
    .route("/:appointmentId/status")
    .put(editAppointmentStatus)

router
    .route("/:appointmentId")
    .delete(deleteAppointment)

export default router;
