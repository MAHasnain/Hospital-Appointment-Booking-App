import { loginApi, logoutApi, refreshAccessTokenApi, registerDoctorApi, registerPatientApi } from "@/api/auth.api";
import { editDoctorProfileApi, getDoctorByIdApi, getDoctorsApi } from "@/api/doctor.api";
import { AuthStore, Doctor, LoginUserPayload, Patient, RegisterDoctorPayload, RegisterPatientPayload } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware"

export const authStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            doctors: [],
            selectedDoctor: null,

            registerDoctor: async (doctor: RegisterDoctorPayload) => {
                try {
                    set({ loading: true, error: null });
                    const response = await registerDoctorApi(doctor);
                    set({
                        user: response.data,
                        isAuthenticated: false,
                        loading: false,
                        error: null
                    });
                } catch (error: any) {
                    set({
                        loading: false,
                        error: error.message,
                    })
                }
            },

            registerPatient: async (patient: RegisterPatientPayload) => {
                try {
                    set({ loading: true, error: null });
                    const response = await registerPatientApi(patient);
                    set({
                        user: response.data,
                        isAuthenticated: false,
                        loading: false,
                        error: null
                    })
                } catch (error: any) {
                    set({
                        loading: false,
                        error: error.message
                    })
                }
            },

            login: async (user: LoginUserPayload) => {
                try {
                    set({ loading: true, error: null });
                    const response = await loginApi(user)

                    console.log(response);
                    set({
                        user: response.data,
                        isAuthenticated: true,
                        loading: false,
                        error: null
                    })
                } catch (error: any) {
                    set({
                        loading: false,
                        error: error.message
                    })
                }
            },

            refreshAccessToken: async () => {
                try {
                    set({ loading: true, error: null });
                    const response = await refreshAccessTokenApi();
                    console.log(response);

                    set({
                        user: response.data,
                        isAuthenticated: true,
                        loading: false,
                        error: null
                    })
                } catch (error: any) {
                    set({
                        loading: false,
                        error: error.message
                    })
                }
            },

            logout: async () => {
                try {
                    set({ loading: true, error: null })
                    await logoutApi();
                    set({
                        user: null,
                        isAuthenticated: false,
                        loading: false,
                        error: null
                    })
                } catch (error: any) {
                    set({
                        loading: false,
                        error: error.message
                    })
                }
            },

            // Doctor profile methods

            getDoctors: async () => {
                try {
                    set({ loading: true, error: null })
                    const response = await getDoctorsApi();
                    set({
                        doctors: response.data,
                        loading: false,
                        error: null
                    })
                } catch (error) {
                    set({ loading: false, error: "Failed to fetch doctors" })
                }
            },
            getDoctorById: async (id: string) => {
                try {
                    set({ loading: true, error: null })
                    const response = await getDoctorByIdApi(id);
                    set({
                        selectedDoctor: response.data,
                        loading: false,
                        error: null
                    })
                } catch (error) {
                    set({ loading: false, error: "Failed to fetch doctor" })
                }
            },
            editDoctorProfile: async (data: any) => {
                try {
                    set({ loading: true, error: null })
                    const response = await editDoctorProfileApi(data);
                    set({ user: response.data, loading: false, error: null })

                } catch (error) {
                    set({ loading: false, error: "Failed to update doctor profile" })
                }
            },

            setError: (error: string) =>
                set({
                    error: error,
                    loading: false
                }),

            clearError: () =>
                set({
                    error: null,
                    loading: false
                })

        }), {
        name: "auth-store",

        partialize: (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated
        }),
    })
);