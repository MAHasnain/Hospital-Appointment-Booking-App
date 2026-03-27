import Appointment from "../models/appointment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getDoctorStats = asyncHandler(async (req, res) => {
    /**
    - req.user._id se doctor ki appointments fetch karo
    - Count karo:
      todaysAppointments → date: today
      totalPatients      → distinct patient IDs count
      pending            → status: "pending"
      completed          → status: "completed"
     */

    const doctorId = req.user._id;
    console.log(doctorId);

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // console.log(today);
    // console.log(startOfDay);
    // console.log(endOfDay);

    // const todaysAppointments = await Appointment.countDocuments({
    //     doctor: doctorId,
    //     date: { $gte: startOfDay, $lte: endOfDay }
    // });
    // const todaysAppointments = await Appointment.find({
    //     doctor: doctorId,
    //     date: { $gte: startOfDay, $lte: endOfDay }
    // });

    // await Appointment.countDocuments()
    // aggregation pipelines

    const stats = await Appointment.aggregate([
        { $match: { doctor: doctorId } },
        {
            $facet: {
                appointmentStats: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
                            completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
                            confirmed: { $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] } },
                        },
                    }
                ],
                totalPatients: [
                    {
                        $group: {
                            _id: "$patient"
                        }
                    },
                    { $count: "count" }
                ],
                todaysAppointments: [
                    {
                        $match: {
                            date: {
                                $gte: startOfDay,
                                $lte: endOfDay
                            }
                        }
                    },
                    {
                        $count: "count"
                    }
                ]
            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { stats: stats, },
            "Appointments stats fetched successfully."
        ))

})

const getPatientStats = asyncHandler(async (req, res) => {
    // - req.user._id se patient ki appointments fetch karo
    // - Count karo:
    //   total       → Appointment.countDocuments({ patient: id })
    //   upcoming    → status: "confirmed" + date > today
    //   pending     → status: "pending"
    //   completed   → status: "completed"
    //   cancelled   → status: "cancelled"
    //   doctorsVisited → distinct doctor IDs count
    const patientId = req.user._id

    const stats = await Appointment.aggregate(
        [
            { $match: { patient: patientId } },
            {
                $facet: {
                    totalAppointments: [
                        {
                            $count: "count"
                        }
                    ],
                    pendingAppointments: [
                        {
                            $group: {
                                _id: null,
                                // total: { $sum: 1 },
                                pending: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                                    }
                                }
                            }
                        }
                    ],
                    confirmedAppointments: [
                        {
                            $group: {
                                _id: null,
                                // total: { $sum: 1 },
                                confirmed: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { stats },
                "Patient stats fetched successfully."
            )
        )

})

export { getDoctorStats, getPatientStats };