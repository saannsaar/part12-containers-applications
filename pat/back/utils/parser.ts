/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Gender, EntryType, DiagnoseEntry, HealthCheckRating } from "../types";

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

export const isGenger = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

export const parseGender = (gender: any): Gender => {
    if(!gender || !isGenger(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};


export const parseType = (entryType: unknown): EntryType => {
    if(!entryType || !isEntryType(entryType)) {
        throw new Error('Incorrect or missing healthentry type');
    }
    return entryType;
};

export const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).map(g => g.toString()).includes(param);
};

export const parseHCRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return healthCheckRating;
};

export const isRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(g => g.toString()).includes(param);
};

export const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};


export const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

export const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

export const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<DiagnoseEntry['code']>;
    }
  
    return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
  };







