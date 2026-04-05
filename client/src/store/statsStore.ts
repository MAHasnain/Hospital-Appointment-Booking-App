import { getDrStatsApi, getPatientStatsApi } from "@/api/stats.api";
import { StatsStore } from "@/types/stats";
import { create } from "zustand";
// feat(stats): implement Zustand store for doctor and patient statistics with async API calls
export const statsStore = create<StatsStore>(
    (set) => ({

        doctorStats: [{
            appointmentStats: [],
            totalPatients: [],
            todaysAppointments: []
        }],
        patientStats: [{
            appointmentStats: [],
            totalPatients: [],
            todaysAppointments: []
        }],
        loading: false,
        error: null,

        getDoctorStatsStore: async () => {
            try {
                set({ loading: true, error: null })

                const response = await getDrStatsApi();
                set({
                    doctorStats: response?.data?.stats || [],
                    loading: false,
                    error: null
                });
            } catch (error) {
                set({ loading: false, error: "Failed to fetch doctor stats" })
            }

        },

        getPatientStatsStore: async () => {
            try {
                set({ loading: true, error: null });
                const response = await getPatientStatsApi();

                set({
                    patientStats: response?.data?.stats || [],
                    loading: false,
                    error: null
                })

            } catch (error) {
                set({
                    loading: false,
                    error: "Failed to fetch patient stats"
                })
            }
        },

    }));
