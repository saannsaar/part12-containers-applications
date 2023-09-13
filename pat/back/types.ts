// TODO

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type NewEntry = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export interface NewHealthCheckEntry extends NewBaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
  }

  export interface NewHospitalEntry extends NewBaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
  }
  
  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
  }


  export interface NewOccupationalHealthcareEntry extends NewBaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
  }


 interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
  }

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;


export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
}

export enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;