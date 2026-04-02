export enum UserRole {
 PATIENT = "patient",
 DOCTOR = "doctor",
}

export interface BaseEntity {
 _id: string;
 createdAt: string;
 updatedAt: string;
}

export interface Doctor extends BaseEntity {
 fullName: string;
 email: string;
 phoneNumber: string;
 avatar?: string;
 speciality: string;
 medicalLicense: string;
 role: UserRole.DOCTOR;
}

export interface Patient extends BaseEntity {
 fullName: string;
 email: string;
 phoneNumber: string;
 avatar?: string;
 role: UserRole.PATIENT;
}

// FORM PAYLOADS

export interface RegisterDoctorPayload {
 fullName: string;
 email: string;
 password: string;
 phoneNumber: number;
 speciality: string;
 medicalLicense: string;
 professionalBio?: string;
 hospital?: string;
 experience?: number;
}

export interface RegisterPatientPayload {
 fullName?: string;
 username: string;
 phoneNumber: number;
 email: string;
 dob?: string;
 address?: string;
 avatar?: string;
 emergencyContact?: string;
 password: string;
}

export interface editPatientProfilePayload {
 fullName?: string;
 username?: string;
 phoneNumber?: number;
 email?: string;
 dob?: string;
 address?: string;
 avatar?: string;
 emergencyContact?: string;
 password?: string;
}

export interface editDoctorProfilePayload {
 fullName?: string;
 email?: string;
 password?: string;
 phoneNumber?: number;
 speciality?: string;
 medicalLicense?: string;
 professionalBio?: string;
 hospital?: string;
 experience?: number;
}