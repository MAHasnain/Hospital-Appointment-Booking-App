import { Appointment } from "@/types/appointment";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppointmentStore = create(
    persist(
        (set) => ({
            appointments: [],

            createAppointment: (appointment: Appointment) =>
                set((state: { appointments: Appointment[] }) => ({
                    appointments: [...state.appointments, appointment]
                })),

            updateAppointment: (updatedAppointment: Appointment) =>
                set((state: { appointments: Appointment[] }) => ({
                    appointments: state.appointments.map((apt: Appointment) =>
                        apt._id === updatedAppointment._id ? updatedAppointment : apt
                    )
                })
            ),

            deleteAppointment: (appointmentId: string) => set(
                (state: { appointments: Appointment[] }) => ({
                    appointments: state.appointments.filter(
                        (apt: Appointment) => apt._id !== appointmentId
                    )
                })
            ),

            getAllAppointments: (appointment: Appointment) =>
                set((state: { appointments: Appointment[] }) => ({
                    appointments: [
                        ...state.appointments,
                        appointment
                    ]
                })
            ),

            getAppointmentById: (appointmentId: string) => 
                set((state: {appointments: Appointment[]}) => ({ 
                    appointments: state.appointments.find(
                        (apt: Appointment) => apt._id === appointmentId
                    )
                })
            )

        }), {
        name: "appointment-store"
    }));