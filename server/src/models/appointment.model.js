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
        enum: ["Follow-up", "Consultation", "Check-up"]
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    },
}, { timestamps: true });

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
