import { BaseEntity, Doctor } from "./users";

export enum WeekDays {
    MON = "mon",
    TUE = "tue",
    WED = "wed",
    THU = "thu",
    FRI = "fri",
    SAT = "sat",
    SUN = "sun",
}

export interface Schedule extends BaseEntity {
    doctor: string;
    workingDays: WeekDays[];
    startTime: string;
    endTime: string;
    slotDuration: string;
    isActive: boolean;
}

export interface SchedulePopulated extends BaseEntity {
    doctor: Doctor;
    workingDays: WeekDays[];
    startTime: string;
    endTime: string;
    slotDuration: string;
    isActive: boolean;
}

// Payloads
export interface CreateSchedulePayload {
    workingDays: WeekDays[];
    startTime: string;
    endTime: string;
    slotDuration: number;
    isActive: boolean;
}

export interface EditSchedulePayload {
    _id: string;
    doctor: string;
    workingDays?: WeekDays[];
    startTime?: string;
    endTime?: string;
    slotDuration?: number;
    isActive?: boolean;
}
