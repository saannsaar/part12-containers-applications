import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

// Fetc all diagnosis
router.get('/', (_req, res) => {
    res.send(diagnoseService.getEntries());
});


// Fetch one diagnoses with given code
router.get('/:code', (req,res) => {
    const { code } = req.params;

    try {
        const findDiagnose = diagnoseService.getOneDiagnose(code);
        res.send(findDiagnose);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({message: error.message});
        }
    }
});


router.post('/', (_req, res) => {
    res.send('Saving a diagnose!');
});

export default router;

