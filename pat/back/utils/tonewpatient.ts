/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NewPatientEntry } from "../types";
import { parseName, parseDate, parseSsn, parseGender, parseOccupation } from "./parser";




const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    if (!object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 
    'dateOfBirth' in object && 
    'ssn' in object && 
    'gender' in object && 
    'occupation' in object) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
         };
         return newPatient;
    }

    throw new Error('Incorrect data: a field missing');   
};

export default toNewPatientEntry;