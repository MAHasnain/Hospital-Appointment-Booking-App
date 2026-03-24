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
    const appointments = await Appointment.find({ patient: userId });

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

const getMyAppointmentById = asyncHandler(async (req, res) => {

    const patientId = req.user._id
    const appointmentId = req.params.appointmentId;
    console.log(appointmentId);

    const appointment = await Appointment.findOne({ _id: appointmentId, patient: patientId });

    console.log(appointment);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                appointment,
                "Appointment fetched successfully."
            )
        );
});

// const getPatientAppointmentById = asyncHandler(async (req, res) => {

//     const { appointmentId } = req.params;
//     const userId = req.user._id
//     console.log(userId);
//     const appointments = await Appointment.findOne({ _id: appointmentId, doctor: userId, });

//     console.log(appointments);

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 appointments,
//                 "Appointments fetched successfully."
//             )
//         );
// });

const getPatientAppointments = asyncHandler(async (req, res) => {
    const doctorId = req.user._id;
    console.log(doctorId);

    const appointments = await Appointment.find({ doctor: doctorId });
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

const changeAppointmentStatus = asyncHandler(async (req, res) => {

    const appointmentId = req.params.appointmentId
    const doctorId = req.user._id;
    const { status } = req.body;
    // console.log(appointmentId);
    // console.log(doctorId);
    // console.log(status);

    const appointment = await Appointment.findOne({ _id: appointmentId, doctor: doctorId });
    appointment.status = status;
    appointment.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                appointment,
                "Appointment status change successfully."
            )
        );

}
);

const editAppointment = asyncHandler(async (req, res) => {

});

// appointment cancel 
const deleteAppointment = asyncHandler(async (req, res) => {

});

export { createAppointment, deleteAppointment, editAppointment, changeAppointmentStatus, getMyAppointmentById, getPatientAppointmentById, getAllMyAppointments, getPatientAppointments };