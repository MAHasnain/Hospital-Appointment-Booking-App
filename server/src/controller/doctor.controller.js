import logger from "../../logger/winston.logger.js"
import Doctor from "../models/doctor.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const getDoctors = asyncHandler(async (req, res) => {

    const doctors = await Doctor.find({}).select("-password -refreshToken")
    // logger.info({ doctors })

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            doctors,
            "All Doctors fetched successfully."
        ));

})

const editDoctorProfile = asyncHandler(async (req, res) => {

    const { fullName, phoneNumber, password, speciality } = req.body;
    const doctorId = req.user._id;
    const avatarFile = req.file
    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (avatarFile) updateData.avatar = avatarFile;
    if (speciality) updateData.speciality = speciality;
    if (password) updateData.password = password;

    const doctor = await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true, runValidators: true }).select("-password");

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
        
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                doctor,
                "Doctor profile updated successfully."
            )
        )
})

const getDoctorById = asyncHandler(async (req, res) => {

    const { id } = req.params;
    console.log(id);

    const doctor = await Doctor.findById(id).select("-password -refreshToken");
    logger.info({ doctor });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                doctor,
                "Doctor Fetch successfully."
            )
        )

})

export { getDoctorById, editDoctorProfile, getDoctors };