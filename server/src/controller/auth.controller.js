import logger from "../../logger/winston.logger.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js";


const registerPatient = asyncHandler(async (req, res) => {
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
    logger.info({ "existedPatient": existedPatient });

    if (existedPatient) {
        throw new ApiError(409, "email and username already exist.");
    }

    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const patientAvatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(patientAvatar);
    if (!patientAvatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const patientData = {
        fullName,
        avatar: patientAvatar.url,
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

const registerDoctor = asyncHandler(async (req, res) => {

    const { fullName, email, phoneNumber, professionalBio, speciality, hospital, medicalLicense, experience, role } = req.body;

    if ([fullName, email, phoneNumber, speciality, medicalLicense].some(field => field.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    };

    const existedDoctor = await Doctor.findOne({ email });
    if (existedDoctor) {
        throw new ApiError(409, "email is already exist.")
    };

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.")
    };

    const doctorAvatar = await uploadOnCloudinary(avatarLocalPath);
    if (!doctorAvatar) {
        throw new ApiError(400, "Avatar file is required.");
    };

    const doctorData = {
        fullName, email,
        avatar: doctorAvatar.url,
        phoneNumber, professionalBio,
        speciality, hospital,
        role, experience,
        medicalLicense
    };

    const doctor = await Doctor.create(doctorData);
    const registeredDoctor = await Doctor.findById(doctor._id).select("-password -refreshToken");
    if (!registeredDoctor) {
        throw new ApiError(500, "Something went wrong while registering a doctor.");
    };

    return res
        .status(201)
        .json(
            new ApiResponse(200, registeredDoctor, "Doctor registered successfully.")
        );

})

const generateAccessAndRefreshToken = async (userId, userRole) => {
    try {

        if (userRole === "doctor") {
            // doctor tokens generating
            const doctor = await Doctor.findById(userId);
            const accessToken = doctor.generateAccessToken();
            const refreshToken = doctor.generateRefreshToken();

            // save in db
            doctor.refreshToken = refreshToken;
            await doctor.save({ validateBeforeSave: false })

            return { accessToken, refreshToken };

        } else if (userRole === "patient") {
            // patient tokens generating
            const patient = await Patient.findById(userId);
            const accessToken = patient.generateAccessToken();
            const refreshToken = patient.generateRefreshToken();

            // save in db
            patient.refreshToken = refreshToken;
            await patient.save({ validateBeforeSave: false })

            return { refreshToken, accessToken };
        }

    } catch (error) {
        console.log("Token generation error: ", error);
        throw new ApiError(500, "Something went wrong while generating access and refresh token,");
    }
}

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "email or password is required");
    }

    let user = await Patient.findOne({ email });

    if (!user) {
        user = await Doctor.findOne({ email })

        // const isPasswordValid = await user.isPasswordCorrect(password);
        // if (!isPasswordValid) {
        //     throw new ApiError(401, "Invalid user credentials.");
        // };

        // const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        // const loggedInDoctor = await Doctor.findById(user._id).select("-password -refreshToken");

        // if (!loggedInDoctor) {
        //     throw new ApiError(500, "Something went wrong");
        // };

        // const options = {
        //     httpOnly: true
        // };

        // return res
        //     .status(200)
        //     .cookie("accessToken", accessToken, options)
        //     .cookie("refreshToken", refreshToken, options)
        //     .json(
        //         new ApiResponse(200,
        //             loggedInDoctor, accessToken, refreshToken,
        //             "Doctor logged in successfully."
        //         )
        //     )

    };
    // final check user 
    if (!user) throw new ApiError(404, "User not found.");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, user.role);

    if (user.role === "patient") {
        const loggedInPatient = await Patient.findById(user._id).select("-password -refreshToken");

        if (!loggedInPatient) {
            throw new ApiError(500, "Something went wrong");
        }

        const options = {
            httpOnly: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200,
                    { loggedInPatient, refreshToken, accessToken },
                    "Patient logged in successfully."
                )
            )

    } else if (user.role === "doctor") {
        const loggedInDoctor = await Doctor.findById(user._id).select("-password -refreshToken");

        if (!loggedInDoctor) {
            throw new ApiError(500, "Something went wrong");
        }

        const options = {
            httpOnly: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200,
                    { loggedInDoctor, refreshToken, accessToken },
                    "Doctor logged in successfully."
                )
            )
    }
});


const logout = asyncHandler(async (req, res) => {

})

const refreshAccessToken = asyncHandler(async (req, res) => {

})

export {
    registerPatient, registerDoctor, login, refreshAccessToken, logout
}