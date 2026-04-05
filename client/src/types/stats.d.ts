export interface Stats {
    appointmentStats: AppointmentStat[]
    totalPatients: TotalPatient[]
    todaysAppointments: TodaysAppointment[]
}

export interface AppointmentStat {
    _id: string | null
    total: number
    pending: number
    completed: number
    confirmed: number
}

export interface TotalPatient {
    count: number
}

export interface TodaysAppointment {
    count: number
}


/**
"stats": [
            {
                "appointmentStats": [
                    {
                        "_id": null,
                        "total": 1,
                        "pending": 0,
                        "completed": 0,
                        "confirmed": 1
                    }
                ],
                "totalPatients": [
                    {
                        "count": 1
                    }
                ],
                "todaysAppointments": [
                {
                        "count": 1
                }
                ]
            }
        ]
 */

export interface StatsStore {
    doctorStats: Stats[],
    patientStats: Stats[],
    loading: boolean,
    error: string | null,

    getDoctorStatsStore: () => Promise<void>;

    getPatientStatsStore: () => Promise<void>;

}