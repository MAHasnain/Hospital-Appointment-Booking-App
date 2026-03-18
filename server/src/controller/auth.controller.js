import logger from "../../logger/winston.logger.js";
import Patient from "../models/patient.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js";


const register = asyncHandler(async (req, res) => {
    /*  
     REGISTER USER ALGORITHM
        getting user data
        data validation  not empty
        check user existance in db
        tokens generating 
        image file uploading on cloudinary
        password encryption
        create user object   save in db
        remove pass and token field to response
        check for user creation then return
    */

    const { fullName, email, username, phoneNumber, dob, address, password, role, emergencyContact } = req.body;
    // logger.info(email);
    // logger.info(username);
    // logger.info(password);
    // logger.info(role);

    // Validation 
    if ([phoneNumber, dob, username, address, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedPatient = await Patient.findOne(
        { $or: [{ username }, { email }] }
    )
    logger.info({"existedPatient": existedPatient});

    if (existedPatient) {
        throw new ApiError(409, "email and username already exist.");
    }

    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(avatar);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const patientData = {
        fullName,
        avatar: avatar.url,
        email,
        username: username.toLowerCase(),
        phoneNumber,
        password,
        address,
        dob,
        role,
        emergencyContact,
    }
    const patient = await Patient.create(patientData);

    const patientRegistered = await Patient.findById(patient._id).select(
        "-password -refreshToken"
    );

    if (!patientRegistered) {
        throw new ApiError(500, "Something went wrong while registering a patient.");
    }
    return res
        .status(201)
        .json(
            new ApiResponse(201, patientRegistered, "Patient registered successfully.")
        );

});

const login = asyncHandler(async (req, res) => {

})
const logout = asyncHandler(async (req, res) => {

})

const refreshAccessToken = asyncHandler(async (req, res) => {

})

export {
    register, login, refreshAccessToken, logout
}