/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../../utils/tonewpatient';
import toNewEntry from '../../utils/tonewentry';


const router = express.Router();

// Fetch all the patient info from database
router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntriers());
});

// Fetch spesific patient info with id 
router.get('/:id', (req,res) => {
    const {id} = req.params;
    try {
        const findPatient = patientService.getOnePatient(id);
        res.send(findPatient);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message});
        }

    }
});

// Add new patient to the database 
router.post('/', (req, res) => {
   try {
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log(newPatientEntry);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
   } catch (error: unknown) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
        errorMessage += ' Error; ' + error.message;
    }
    res.status(400).send(errorMessage);
   }
});


// Add new entry to spesific patient in db
router.post('/:id/entries', (req,res) => {
    const {id} = req.params;
    try {
        const findPatient = patientService.getOnePatient(id);
        if (findPatient) {
            const newEntry = toNewEntry(req.body);
            const addedEntry = patientService.addEntry(findPatient, newEntry);
            res.json(addedEntry);
        }
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong. ';
        if (error instanceof Error) {
            errorMessage += ' Error; ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;

