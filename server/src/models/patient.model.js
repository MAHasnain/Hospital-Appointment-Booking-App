import { model, Schema } from "mongoose";

// joi validation schema
/* const patientJoiSchema = joi.object({
    firstName: joi.string().min(3).max(30),
    lastName: joi.string().min(3).max(30),
    username: joi.string().min(4).max(10).required(),
    dob: joi.string(),
    email: joi.string(),
    address: joi.string(),
    phone: joi.string().pattern(/^[0-9]{11}$/).required(),
    password: joi.string(),
})
const patientSchema = new Schema(patientJoiSchema, { timestamps: true }); */

const patientSchema = new Schema({

    fullName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, "username is required"],
        index: true
    },
    phoneNumber: {
        type: Number,
        required: [true, "phone number is required"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "email is required"]
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },

    role: "patient",
    emergencyContact: {
        type: String,

    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },

}, { timestamps: true });

const Patient = model("Patient", patientSchema);

export default Patient;
