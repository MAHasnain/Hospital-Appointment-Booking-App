import { Appointment, CreateAppointmentPayload, EditAppointmentPayload } from "@/types/appointment";
import apiClient from ".";

export const createAppointmentApi = (data: CreateAppointmentPayload) => apiClient.post("/appointments", data);
export const getAllMyAppointmentsApi = () => apiClient.get("appointments/all");
export const getMyAppointmentByIdApi = (data: Appointment) => apiClient.get(`/appointments/${data._id}`);
export const getPatientAppointmentByIdApi = (data: Appointment) => apiClient.get(`/appointments/patient/${data._id}`);
export const getPatientAppointmentsApi = () => apiClient.get("appointments/");
export const changeAppointmentStatusApi = (data: Appointment) => apiClient.patch(`appointments/${data._id}/status`, data);
export const editAppointmentApi = (_id: string, data: EditAppointmentPayload) => apiClient.put(`/appointments/${_id}`, data);
export const deleteAppointmentApi = (data: Appointment) => apiClient.delete(`appointments/${data._id}`);