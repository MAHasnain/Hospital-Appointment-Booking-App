import { editDoctorProfilePayload } from "@/types/users";
import apiClient from ".";

export const getDoctorsApi = () => apiClient.get("/doctors");
export const getDoctorByIdApi = (id: string) => apiClient.get(`/doctors/${id}`);
export const editDoctorProfileApi = (data: editDoctorProfilePayload) => apiClient.put(`/doctors/profile`, data);
