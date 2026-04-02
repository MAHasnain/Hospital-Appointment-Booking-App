import { Appointment, CreateAppointmentPayload, EditAppointmentPayload } from "@/types/appointment";
import apiClient from ".";

export const createAppointment = (data: CreateAppointmentPayload) => apiClient.post("/appointments", data);
export const getAppointments = () => apiClient.get("appointments/");
export const getAllMyAppointments = () => apiClient.get("appointments/all");
export const getMyAppointmentById = (data: Appointment) => apiClient.get(`/appointments/${data._id}`);
export const getPatientAppointmentById = (data: Appointment) => apiClient.get(`/appointments/patient/${data._id}`);
export const getPatientAppointments = () => apiClient.get("appointments/");
export const changeAppointmentStatus = (data: Appointment) => apiClient.patch(`appointments/${data._id}/status`, data);
export const editAppointment = (_id: string, data: EditAppointmentPayload) => apiClient.put(`/appointments/${_id}`, data);
export const deleteAppointment = (data: Appointment) => apiClient.delete(`appointments/${data._id}`);