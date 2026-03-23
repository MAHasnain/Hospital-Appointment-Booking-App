import logger from "../../logger/winston.logger.js";
import Appointment from "../models/appointment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"


const createAppointment = asyncHandler(async (req, res) => {
    const { reason, date, timeSlot, appointmentType, status } = req.body;

    // if (!timeSlot) {
    //     throw new ApiError(401, "");
    // }

    const patientId = req.user._id;
    const { doctorId } = req.params;

    const existingAppointment = await Appointment.findOne({
        doctor: doctorId,
        date,
        timeSlot
    });
    if (existingAppointment) {
        throw new ApiError(409, "This slot is already booked");
    };

    console.log(doctorId);
    const appointmentData = {
        patient: patientId,
        doctor: doctorId,
        appointmentType,
        timeSlot,
        reason,
        date
    };
    const createdAppointment = await Appointment.create(appointmentData);

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdAppointment,
                "Appointment created successfully."
            )
        );

})
const getAllMyAppointments = asyncHandler(async (req, res) => {

    const userId = req.user._id
    console.log(userId);
    const appointments = await Appointment.find({patient: userId});

    console.log(appointments);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                appointments,
                "Appointments fetched successfully."
            )
        );
});

const getPatientAppointments = asyncHandler(async (req, res) => {

}
)
const editAppointmentStatus = asyncHandler(async (req, res) => {

}
)
const deleteAppointment = asyncHandler(async (req, res) => {

}
)

export { createAppointment, deleteAppointment, editAppointmentStatus, getAllMyAppointments, getPatientAppointments };