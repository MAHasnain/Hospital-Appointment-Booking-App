import { model, Schema } from "mongoose";

const scheduleSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    availableSlots: {
        type: String,

    },
    workingDays: {
        type: [String],

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
        type: String
    },
    slotDuration: {
        type: Number
    },
    breakDuration: {
        type: Number
    }
});

const Schedule = model("Schedule", scheduleSchema);

export default Schedule;
