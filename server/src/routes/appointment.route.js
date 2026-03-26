import { Router } from "express";
import { changeAppointmentStatus, createAppointment, deleteAppointment, editAppointment, getAllMyAppointments, getMyAppointmentById, getPatientAppointments } from "../controller/appointment.controller.js";
import { verifyJWT, verifyRole } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/:doctorId")
    .post(verifyJWT, verifyRole("patient"), createAppointment)

router
    .route("/all")
    .get(verifyJWT, verifyRole("patient"), getAllMyAppointments)

// router
//     .route("/:appointmentId")
//     .get(verifyJWT, verifyRole("patient"), getPatientAppointmentById)

router
    .route("/:appointmentId")
    .get(verifyJWT, verifyRole("patient"), getMyAppointmentById)
    .put(verifyJWT, verifyRole("patient"), editAppointment)
    .delete(verifyJWT, verifyRole("patient"), deleteAppointment)

router
    .route("/doctor")
    .get(verifyJWT, verifyRole("doctor"), getPatientAppointments)

router
    .route("/:appointmentId/status")
    .put(verifyJWT, verifyRole("doctor"), changeAppointmentStatus)

export default router;
