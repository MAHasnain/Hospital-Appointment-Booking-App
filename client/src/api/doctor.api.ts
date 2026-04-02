import { editDoctorProfilePayload } from "@/types/users";
import apiClient from ".";

export const getDoctors = () => apiClient.get("/doctors");
export const getDoctorById = (id: string) => apiClient.get(`/doctors/${id}`);
export const editDoctorProfile = (data: editDoctorProfilePayload) => apiClient.put(`/doctors/profile`, data);
