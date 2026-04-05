import { createScheduleApi, deleteScheduleApi, editScheduleApi, getScheduleByDrIdApi } from "@/api/schedule.api";
import { CreateSchedulePayload, EditSchedulePayload, Schedule, ScheduleStore } from "@/types/schedule";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useScheduleStore = create<ScheduleStore>()(
    (set) => ({

        schedule: null,
        loading: false,
        error: null,

        createSchedule: async (schedule: CreateSchedulePayload) => {
            try {
                set({ loading: true, error: null });
                const response = await createScheduleApi(schedule as any);
                set({
                    schedule: response?.data,
                    loading: false,
                    error: null
                })
            } catch (error) {
                console.error("Error creating schedule:", error);
                set({
                    loading: false,
                    error: error?.response?.data?.message || "Failed to create schedule"
                });
            }
        },

        editSchedule: async (schedule: EditSchedulePayload) => {
            try {
                set({ loading: true, error: null });
                const response = await editScheduleApi(schedule as any);
                set({
                    schedule: response?.data,
                    loading: false,
                    error: null
                })
            } catch (error) {
                console.log("Error editing schedule:", error);
                set({ loading: false, error: "Failed to edit schedule." });
            }
        },

        deleteSchedule: async (scheduleId: string) => {
            try {
                set({ loading: true, error: null });
                await deleteScheduleApi({ _id: scheduleId } as Schedule);
                set({
                    schedule: null,
                    loading: false,
                    error: null
                })
            } catch (error) {
                console.log("Error deleting schedule:", error);
                set({ loading: false, error: "failed to delete schedule" });
            }
        },

        getScheduleByDrId: async (doctorId: string) => {
            try {
                set({ loading: true, error: null });
                const response = await getScheduleByDrIdApi(doctorId);
                set({
                    schedule: response?.data,
                    loading: false,
                    error: null
                })
            } catch (error) {
                console.log("Error fetching schedule:", error);
                set({ loading: false, error: "Failed to fetch schedule" })
            }
        }

    })
);