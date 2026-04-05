import apiClient from ".";

export const getDrStatsApi = () => apiClient.get("/stats/doctor");
export const getPatientStatsApi = () => apiClient.get("/stats/patient");
