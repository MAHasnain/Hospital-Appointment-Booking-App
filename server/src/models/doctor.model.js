import { model, Schema } from "mongoose";

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
    speciality: {
        type: Schema.Types.ObjectId,
        ref: "Speciality"
    },
    professionalBio: {
        type: String,

    },
    avatar: {
        // Cloudinary URL 
        type: String,

    }
}, {
    timestamps: true
});

const Doctor = model("Doctor", doctorSchema);

export default Doctor;
