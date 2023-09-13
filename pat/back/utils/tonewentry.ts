import { NewHealthCheckEntry, NewHospitalEntry, NewBaseEntry, NewOccupationalHealthcareEntry } from "../types";
import { parseDescription, parseDate, parseSpecialist, parseDiagnosisCodes, parseType, parseHCRating, parseCriteria } from "./parser";

const toNewEntry = (object: unknown): NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry => {

    if (!object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
        const newEntry: NewBaseEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
         };
         
         if(parseType(object.type)) {
            if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
                const newHealthCheckEntry: NewHealthCheckEntry = {
                    ...newEntry,
                    type: 'HealthCheck',
                    healthCheckRating: parseHCRating(object.healthCheckRating),
                };
                return newHealthCheckEntry;
             } 
             
             else if (object.type === 'Hospital' && 'discharge' in object && typeof object.discharge === 'object' && object.discharge !== null && 'date' in object.discharge && 'criteria' in object.discharge) {
                const newHospitalEntry: NewHospitalEntry = {
                    ...newEntry,
                    type: 'Hospital',
                    discharge: {
                        date: parseDate(object.discharge.date),
                        criteria: parseCriteria(object.discharge.criteria)
                    },
                };
                return newHospitalEntry;
             }
             else if(object.type === 'OccupationalHealthcare' && 'employerName' in object && 'sickLeave' in object && typeof object.sickLeave === 'object' && object.sickLeave !== null && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave) {
                const newOccupationalHCEntry: NewOccupationalHealthcareEntry = {
                    ...newEntry,
                    type: 'OccupationalHealthcare',
                    employerName: parseSpecialist(object.employerName),
                    sickLeave: {
                        startDate: parseDate(object.sickLeave.startDate),
                        endDate: parseDate(object.sickLeave.endDate),
                    }
                };
                return newOccupationalHCEntry;
             }
         }
        

    }

    throw new Error('Incorrect data: a field missing');   
};

export default toNewEntry;