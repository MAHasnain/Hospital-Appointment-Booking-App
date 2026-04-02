import { Doctor, Patient } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware"

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: true,
            error: null,

            registerDoctor: (doctor: Doctor) =>
                set({
                    user: doctor,
                    isAuthenticated: true,
                    loading: false,
                    error: null
                }),

            registerPatient: (patient: Patient) =>
                set({
                    user: patient,
                    isAuthenticated: true,
                    loading: false,
                    error: null
                }),

            login: (user: Doctor | Patient) =>
                set({
                    user: user,
                    isAuthenticated: true,
                    loading: true,
                    error: null
                }),

            refreshAccessToken: (accessToken: string) =>
                set((state: { user: Doctor | Patient | null }) => ({
                    user: state.user ? { ...state.user, accessToken } : null,
                    loading: false,
                    error: null
                })),

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                    error: null
                }),

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
        name: "auth-store"
    })
);