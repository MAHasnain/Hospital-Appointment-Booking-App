import { CreateSchedulePayload, EditSchedulePayload, Schedule } from "@/types/schedule";
import apiClient from ".";

export const createScheduleApi = (data: CreateSchedulePayload) => apiClient.post("/schedule/", data);
export const editScheduleApi = (data: EditSchedulePayload) => apiClient.put(`/schedule/${data._id}`, data);
export const deleteScheduleApi = (data: Schedule) => apiClient.delete(`/schedule/${data._id}`);
export const getScheduleByDrIdApi = (doctorId: string) => apiClient.get(`/schedule/doctor/:${doctorId}`);
