/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Entry, NewEntry } from '../../types';


const patients: PatientEntry[] = patientsData;

const getPatients = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntriers = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id, 
        name,
        dateOfBirth, 
        gender,
        occupation,
        entries
    }));
};

const getOnePatient = ( id: string ): PatientEntry => {
    const foundPatient = patients.find(p => p.id === id);
    if (!foundPatient) {
        throw new Error('Could not find patient');
    }
    return foundPatient;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const newPatientEntry = {
        ...entry,
        id: uuid()
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (patient: PatientEntry, entry: NewEntry): Entry => {
   const newEntry: Entry = {
    id: uuid(),
    ...entry,
   };

   patient.entries.push(newEntry);

   return newEntry;

};

export default {
    getPatients,
    getNonSensitiveEntriers,
    addPatient,
    getOnePatient,
    addEntry
};
