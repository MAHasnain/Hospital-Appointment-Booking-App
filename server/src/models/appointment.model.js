import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient"
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    appointmentType: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"]
    },
    
});

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
