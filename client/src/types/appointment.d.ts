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

export interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;

  createAppointment: (appointment: Appointment) => Promise<void>;
  editAppointment: (_id: string, data: EditAppointmentPayload) => Promise<void>;
  deleteAppointment: (appointmentId: string) => Promise<void>;
  getAllMyAppointments: () => Promise<void>;
  getAppointmentById: (id: string) => Promise<void>;
  changeAppointmentStatus: (id: string) => Promise<void>;
  getPatientAppointmentById: (id: string) => Promise<void>;
  getPatientAppointments: () => Promise<void>;

  setSelectedAppointment: (appointment: Appointment | null) => void;
}
