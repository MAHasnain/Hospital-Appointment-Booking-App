import { CreateSchedulePayload, EditSchedulePayload, Schedule } from "@/types/schedule";
import apiClient from ".";

export const createSchedule = (data: CreateSchedulePayload) => apiClient.post("/schedule/", data);
export const editSchedule = (data: EditSchedulePayload) => apiClient.put(`/schedule/${data._id}`, data);
export const deleteSchedule = (data: Schedule) => apiClient.delete(`/schedule/${data._id}`);
export const getScheduleById = (id: string) => apiClient.get(`/schedule/${id}`);
