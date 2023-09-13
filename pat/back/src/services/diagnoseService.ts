import diagnosesData from '../../data/diagnoses';

import { DiagnoseEntry } from '../../types';


const diagnoses: DiagnoseEntry[] = diagnosesData ;

const getEntries = (): DiagnoseEntry[] => {
    return diagnoses;
};

const getOneDiagnose = ( code: string ): DiagnoseEntry => {
    const foundDiagnose = diagnoses.find(d => d.code === code);
    if (!foundDiagnose) {
        throw new Error('Could not find the right diagnose');
    }
    return foundDiagnose;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose,
    getOneDiagnose
};
