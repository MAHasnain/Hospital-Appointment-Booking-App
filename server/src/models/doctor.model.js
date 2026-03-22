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
        required: [true, "email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Enter a valid email address.'
        ],
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    professionalBio: {
        type: String,

    },
    speciality: {
        type: String,
        required: true
        // type: Schema.Types.ObjectId,
        // ref: "Speciality"
    },
    hospital: {
        type: String
    },
    medicalLicense: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Enter a strong password"
        ],
        required: true
    },
    avatar: {
        // Cloudinary URL 
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "doctor"
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
});


doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    // next();
})

doctorSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    )
}

doctorSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    )
}

doctorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const Doctor = model("Doctor", doctorSchema);

export default Doctor;
