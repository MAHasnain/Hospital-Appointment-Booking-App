import { Router } from "express";
import { createAppointment, deleteAppointment, editAppointmentStatus, getAllMyAppointments, getPatientAppointments } from "../controller/appointment.controller.js";

const router = Router();

router
    .route("/")
    .post(createAppointment)

router
    .route("/all")
    .get(getAllMyAppointments)

router
    .route("/doctor")
    .get(getPatientAppointments)

router
    .route("/:appointmentId/status")
    .put(editAppointmentStatus)

router
    .route("/:appointmentId")
    .delete(deleteAppointment)

export default router;
