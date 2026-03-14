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
    }
});

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;
