import App from "next/app";
import { BaseEntity, Doctor, Patient } from "./users";

export interface Appointment extends BaseEntity {
    _id: string;
    patient: string;
    doctor: string;
    date: string;
    timeSlot: string;
    appointmentType: AppointmentType.consultation;
    status: Status.pending;
    reason?: string;
}

export enum Status {
    pending = "PENDING",
    confirmed = "CONFIRMED",
    completed = "COMPLETED",
    cancelled = "CANCELLED",
}

export enum AppointmentType {
    followup = "FOLLOW-UP",
    consultation = "CONSULTATION",
    Checkup = "CHECK-UP",
}

// POPULATED APPOINTMENT

export interface AppointmentPopulated extends BaseEntity {
    _id: string;
    patient: Patient;
    doctor: Doctor;
    date: string;
    timeSlot: string;
    appointmentType: AppointmentType.consultation;
    status: Status.pending;
    reason?: string;
}

// FORM PAYLOADS

export interface CreateAppointmentPayload {
    doctor: string;
    patient: string;
    date: string;
    timeSlot: string;
    appointmentType: AppointmentType.consultation;
    status: Status.pending;
    reason?: string;
}

export interface EditAppointmentPayload {
    date?: string;
    timeSlot?: string;
    appointmentType: AppointmentType.consultation;
    reason?: string;
}

export interface AppointmentStore {
    appointments: Appointment[];
    createAppointment: (appointment: Appointment) => void;
    updateAppointment: (appointment: Appointment) => void;
    deleteAppointment: (appointmentId: string) => void;
    setAllAppointments: (appointments: Appointment[]) => void;
    getAppointmentById: (appointmentId: string) => Appointment | undefined;
}