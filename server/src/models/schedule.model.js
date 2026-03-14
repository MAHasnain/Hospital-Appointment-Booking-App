import { model, Schema } from "mongoose";

const scheduleSchema = new Schema({
    availableSlots: {
        type: String,

    },
    dayOfWeek: {
        type: Number
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const Schedule = model("Schedule", scheduleSchema);

export default Schedule;
