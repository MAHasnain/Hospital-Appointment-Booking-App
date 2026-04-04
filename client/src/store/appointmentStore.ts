import { changeAppointmentStatusApi, createAppointmentApi, deleteAppointmentApi, editAppointmentApi, getAllMyAppointmentsApi, getMyAppointmentByIdApi, getPatientAppointmentByIdApi, getPatientAppointmentsApi } from "@/api/appointment.api";
import { Appointment, AppointmentState, EditAppointmentPayload } from "@/types/appointment";
import { create } from "zustand";

export const useAppointmentStore = create<AppointmentState>(
    (set) => ({
        appointments: [],
        selectedAppointment: null,
        loading: false,
        error: null,

        createAppointment: async (appointment: Appointment) => {
            try {
                set({ loading: true, error: null })
                const response = await createAppointmentApi(appointment);

                set((state) => ({
                    appointments: [...state.appointments, response.data],
                    loading: false,
                    error: null
                }))
            } catch (error) {
                set({ loading: false, error: "Failed to create appointment" })
            }
        },

        editAppointment: async (_id: string, updateAppointment: EditAppointmentPayload) => {
            try {
                set({ loading: true, error: null })
                const response = await editAppointmentApi(_id, updateAppointment);
                set((state) => ({
                    appointments: state.appointments.map(apt => apt._id === _id
                        ? response.data
                        : apt
                    ),
                    selectedAppointment:
                        state.selectedAppointment?._id === _id
                            ? response.data
                            : state.selectedAppointment,
                    loading: false
                }))
            } catch (error) {
                set({ loading: false, error: "Failed to update appointment." });
            }
        },

        deleteAppointment: async (appointmentId: string) => {
            try {
                set({ loading: true, error: null })
                await deleteAppointmentApi(appointmentId)
                set((state) => ({
                    appointments: state.appointments.filter((apt) => apt._id !== appointmentId),
                    selectedAppointment: state.selectedAppointment?._id === appointmentId
                        ? null
                        : state.selectedAppointment,
                    loading: false
                }));
            } catch (error) {
                set({ loading: false, error: "Failed to delete appointment." });
            }
        },

        getAllMyAppointments: async () => {
            try {
                set({ loading: true, error: null });
                const response = await getAllMyAppointmentsApi();
                set({
                    appointments: response.data,
                    loading: false,
                    error: null
                })
            } catch (error) {
                set({ loading: false, error: "Failed to get all appointments." });
            }
        },

        getAppointmentById: async (appointmentId: string) => {
            try {
                set({ loading: true, error: null });
                const response = await getMyAppointmentByIdApi(appointmentId);
                set({
                    selectedAppointment: response.data,
                    loading: false
                })
            } catch (error) {
                set({ loading: false, error: "Failed to get appointment by id." })
            }
        },

        changeAppointmentStatus: async (appointmentId: string) => {
            try {
                set({ loading: true, error: null });
                const response = await changeAppointmentStatusApi(appointmentId);
                set((state) => ({
                    appointments: state.appointments.map(apt => apt._id === appointmentId
                        ? { ...apt, status: response.data.status }
                        : apt
                    ),
                    selectedAppointment: state.selectedAppointment?._id === appointmentId
                        ? { ...state.selectedAppointment, status: response.data.status }
                        : state.selectedAppointment,
                    loading: false,
                    error: null
                })
                )
            } catch (error) {
                set({ loading: false, error: "Failed to change appointment status." })
            }
        },

        getPatientAppointmentByIdApi: async (patientId: string) => {
            try {
                set({ loading: true, error: null });
                const response = await getPatientAppointmentByIdApi(patientId);
                set({
                    selectedAppointment: response.data,
                    loading: false,
                    error: null
                })
            } catch (error) {
                set({ loading: false, error: "Failed to get patient appointments." })
            }
        },

        getPatientAppointmentsApi: async () => {
            try {
                set({ loading: true, error: null });
                const response = await getPatientAppointmentsApi();
                set({
                    appointments: response.data,
                    loading: false,
                    error: null
                })

            } catch (error) {
                set({ loading: false, error: "Failed to get patient appointments." })
            }
        }
    })
);

