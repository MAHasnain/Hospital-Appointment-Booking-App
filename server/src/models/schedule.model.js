import { model, Schema } from "mongoose";

const scheduleSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    availableSlots: {
        type: [String],

    },
    workingDays: {
        type: [String],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    slotDuration: {
        type: Number,
        required: true
    }
});

const Schedule = model("Schedule", scheduleSchema);

export default Schedule;
