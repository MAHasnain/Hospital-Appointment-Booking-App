import { Schedule } from "@/types/schedule";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useScheduleStore = create(
    persist(
        (set) => ({

            schedule: null,

            createSchedule: (schedule: Schedule) =>
                set((state: Schedule) => ({
                    schedule: { ...schedule }
                })
            ),

            editSchedule: (schedule: Schedule) =>
                set((state: Schedule) => ({
                    schedule: { ...state, ...schedule }
                })
            ),

            deleteSchedule: (scheduleId: string) =>
                set((state: Schedule) => ({
                    schedule: { ...state._id === scheduleId ? { schedule: null } : state }
                })
            ),

            getScheduleByDrId: (doctorId: string) => 
                set((state: Schedule) => ({
                    schedule: state.doctor === doctorId ? state : null
                })
            )
            

        }), {
        name: "schedule-store"
    })
);