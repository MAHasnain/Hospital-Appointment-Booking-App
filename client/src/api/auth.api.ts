import { RegisterDoctorPayload, RegisterPatientPayload } from "@/types/users";
import apiClient from ".";
import { editPatientProfilePayload } from "@/types/users";

export const registerPatientApi = (data: RegisterPatientPayload) => apiClient.post("/auth", data)
export const registerDoctorApi = (data: RegisterDoctorPayload) => apiClient.post("/auth", data)
export const loginApi = (data: { email: string; password: string }) => apiClient.post("/auth/login", data)
export const editPatientProfileApi = (data: editPatientProfilePayload) => apiClient.put("/auth/profile", data)
export const refreshAccessTokenApi = () => apiClient.post("/auth/refresh-token")
export const logoutApi = () => apiClient.post("/auth/logout")