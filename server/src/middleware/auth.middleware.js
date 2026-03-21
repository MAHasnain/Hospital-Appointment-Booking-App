import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    };

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);

        if (decodedToken?.role === "patient") {
            let user = await Patient.findById(decodedToken?._id).select(" -password -refreshToken");
            req.user = user;
            next();

        } else if (decodedToken?.role === "doctor") {
            let user = await Doctor.findById(decodedToken?._id).select(" -password -refreshToken");
            req.user = user;
            next();

        }
        // console.log(user);

        // if (!user) {
        //     throw new ApiError(401, "Invalid access token");
        // }

    } catch (error) {

        console.log(error);
        throw new ApiError(500, error?.message || "Invalid access token");

    }
});
