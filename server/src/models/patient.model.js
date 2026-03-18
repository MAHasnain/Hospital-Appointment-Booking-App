import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        match: [/^[a-z0-9_-]+$/, "Username is invalid"],
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
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Enter a valid email address.'
        ],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "email is required"]
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },

    role: {
        type: String,
        default: "patient"
    },
    emergencyContact: {
        type: String,

    },
    password: {
        type: String,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Enter a strong password"
        ],
        required: true
    },
    refreshToken: {
        type: String,
    },

}, { timestamps: true });

const Patient = model("Patient", patientSchema);

patientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

patientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

patientSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    );

}

patientSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

export default Patient;
