import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const doctorSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "email is required"]
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    professionalBio: {
        type: String,

    },
    speciality: {
        type: Schema.Types.ObjectId,
        ref: "Speciality"
    },
    hospital: {
        type: String
    },
    medicalLicense: {
        type: String
    },
    experience: {
        type: Number
    },
    avatar: {
        // Cloudinary URL 
        type: String,
    },
    rating: {
        type: Number
    },
    role: "doctor"
}, {
    timestamps: true
});

const Doctor = model("Doctor", doctorSchema);

doctorSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    )
}

doctorSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    )
}

doctorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default Doctor;
