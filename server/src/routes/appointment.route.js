import { Router } from "express";
import { createAppointment, deleteAppointment, editAppointmentStatus, getAllMyAppointments, getPatientAppointments } from "../controller/appointment.controller.js";
import { verifyJWT, verifyRole } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/:doctorId")
    .post(verifyJWT, verifyRole("patient"),createAppointment)

router
    .route("/all")
    .get(verifyJWT, verifyRole("patient"),getAllMyAppointments)

router
    .route("/doctor")
    .get(verifyJWT, verifyRole("doctor"),getPatientAppointments)

router
    .route("/:appointmentId/status")
    .put(verifyJWT, verifyRole("doctor"),editAppointmentStatus)

router
    .route("/:appointmentId")
    .delete(verifyJWT, verifyRole("paient"),deleteAppointment)

export default router;
