import logger from "../../logger/winston.logger.js";
import Schedule from "../models/schedule.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @LOGIC_FLOW SCHEDULE CREATION 
 * 
 * auth and role verify
 * data collection
 * data validation
 * slots generating
 * db call (save)
 * response return 
 */
const createSchedule = asyncHandler(async (req, res) => {

    const { workingDays, startTime, endTime, slotDuration, isActive } = req.body;
    console.log("body values:", startTime, endTime);

    // validation
    if ([workingDays, startTime, endTime, slotDuration].some(field => field === "")) {
        throw new ApiError(400, "All fields are required");
    };

    const existingSchedule = await Schedule.findOne({ doctor: req.user._id, startTime, endTime });
    console.log({ existingSchedule: existingSchedule });
    if (existingSchedule) {
        throw new ApiError(402, "Schedule already exist");
    };

    //  * slots generating

    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":");
        return (Number(hours) * 60) + Number(minutes);
    }
    const minutesToTime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    };

    const startTimeInMins = timeToMinutes(startTime);
    const endTimeInMins = timeToMinutes(endTime);
    console.log(startTimeInMins);
    console.log(endTimeInMins);

    let availableSlots = [];

    for (let i = startTimeInMins; i < endTimeInMins; i += Number(slotDuration)) {
        availableSlots.push(minutesToTime(i));
    }

    logger.info(availableSlots);

    const schedule = {
        doctor: req.user._id,
        workingDays,
        startTime,
        endTime,
        availableSlots,
        slotDuration
    };
    const scheduleCreated = await Schedule.create(schedule);
    console.log(scheduleCreated);

    if (!scheduleCreated) {
        throw new ApiError(500, "Something went wrong");
    };
    const newSchedule = await Schedule.findById(scheduleCreated._id)

    return res
        .status(201)
        .json(new ApiResponse(200, newSchedule, "Schedule created successfully."));

})

// status chenge 
const editSchedule = asyncHandler(async (req, res) => {

}
)

const getScheduleByDrId = asyncHandler(async (req, res) => {

})

export { createSchedule, editSchedule, getScheduleByDrId };