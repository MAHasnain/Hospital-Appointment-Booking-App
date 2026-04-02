import { RegisterDoctorPayload, RegisterPatientPayload } from "@/types/users";
import apiClient from ".";
import { editPatientProfilePayload } from "@/types/users";

export const registerPatient = (data: RegisterPatientPayload) => apiClient.post("/", data)
export const registerDoctor = (data: RegisterDoctorPayload) => apiClient.post("/", data)
export const login = (data: { email: string; password: string }) => apiClient.post("/login", data)
export const editPatientProfile = (data: editPatientProfilePayload) => apiClient.put("/profile", data)
export const refreshAccessToken = (data: { refreshToken: string }) => apiClient.post("/refresh-token", data)
export const logout = (data: { refreshToken: string }) => apiClient.post("/logout", data)