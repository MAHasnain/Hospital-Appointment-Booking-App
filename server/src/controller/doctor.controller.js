import logger from "../../logger/winston.logger.js"
import Doctor from "../models/doctor.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const getDoctors = async (req, res) => {

    const doctors = await Doctor.find({}).select("-password -refreshToken")
    // logger.info({ doctors })

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            doctors,
            "All Doctors fetched successfully."
        ));

}

const editDoctorProfile = async (req, res) => {

    const {} = req.body;
    

}

const getDoctorById = async (req, res) => {

    const { id } = req.params;
    console.log(id);

    const doctor = await Doctor.findById(id).select("-password -refreshToken");
    logger.info({doctor});

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                doctor,
                "Doctor Fetch successfully."
            )
        )

}

export { getDoctorById, editDoctorProfile, getDoctors };