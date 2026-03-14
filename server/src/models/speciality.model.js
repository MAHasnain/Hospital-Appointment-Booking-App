import { Schema, model } from "mongoose";

const specialitySchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    speciality: {
        type: String,
        required: true
    },
    experienceYears: {
        type: Number,
        default: 0
    },
    
});

const Speciality = model("Speciality", specialitySchema);

export default Speciality;