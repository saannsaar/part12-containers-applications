import { useState, SyntheticEvent, Dispatch, SetStateAction, useEffect } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl, Alert } from '@mui/material';
import patientService from "../../../services/patients";
import diagnoseService from "../../../services/diagnosis";
import { PatientFormValues, Gender, EntryFormValues, EntryType, NewBaseEntry, HealthCheckRating, Entry, Patient, DiagnoseEntry } from "../../../types";
import axios from "axios";
import { apiBaseUrl } from "../../../constants";

interface Props {
  onCancel: () => void;
  setError:  React.Dispatch<React.SetStateAction<string | undefined>>;
  setPatient:  React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  patient: Patient;
  error?: string;
  
}

interface EntryTypeOptions{
  value: EntryType;
  label: string;
}

 
const entryTypeOptions: EntryTypeOptions[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntry = ({ onCancel, setError, patient, setPatient, setModalOpen, error }: Props) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [employername, setEmployername] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [healthcearRating, setHealthCearRating] = useState("0");
  const [selectedDischarge, setSelectedDischarge] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [entrytype, setEntrytype] = useState(EntryType.Hospital);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [selectedDiagnosisCodes, setSeelectedDiagnosisCodes] = useState<Array<DiagnoseEntry['code']>>([]);

  // Entry type Change eventhandler
  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const entryT = Object.values(EntryType).find(g => g.toString() === value);
      if (entryT) {
        setEntrytype(entryT);
      }
    }

  };
  
  
  const onHCRChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      setHealthCearRating(value);
    }
  }
  useEffect(() => {
    const getDiagnosis = async () => {
    
        await diagnoseService.getAll().then((response) => {
          
          setDiagnosisCodes(response.map(d => d['code']))
        }).catch((error) => {
          console.log(error.message)
        })
      
    }

    void getDiagnosis();
  }, [])
  

  const createNewEntry = (newBaseEntry : NewBaseEntry) => {
    switch (entrytype) {
        case EntryType.Hospital: 
            return {
                ...newBaseEntry,
                type: EntryType.Hospital,
                discharge: {
                    date: selectedDischarge,
                    criteria: dischargeCriteria,
                },
            };
        case EntryType.HealthCheck:
            return {
                ...newBaseEntry,
                type: EntryType.HealthCheck,
                healthCheckRating: healthcearRating,
            };
        case EntryType.OccupationalHealthcare:
            return {
              ...newBaseEntry,
              type: EntryType.OccupationalHealthcare,
              employerName: employername,
              sickLeave: {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd,
              },
            };
    }
  }

  const addEntry = async (event: SyntheticEvent) => {
   try { event.preventDefault();
    const newBaseEntry: NewBaseEntry = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: [], // TODO: Add this back in once we have a way to get
    }
    const fullEntry = createNewEntry(newBaseEntry);

    

    console.log(fullEntry)

    if(patient && patient !== undefined) {
      const entry = await patientService.createEntry(patient, fullEntry);
      const newPatient = {
        ...patient,
        entries: [...patient.entries, fullEntry]
      }
      
      setModalOpen(false)
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace('Something went wrong. Error: ', '');
        console.error(message);
        setError(message);
      } else {
        setError("Unrecognized axios error");
      }
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  }

  };
const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof selectedDiagnosisCodes>) => {
  event.preventDefault();
  console.log(event.target.value);
  const {target : { value }, } = event;
   
    setSeelectedDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  
}
  

  return (
    <div>
      {error && 
      <Alert severity="error">{` ${error}`}</Alert>}
      <form onSubmit={addEntry}>

     <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

         <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      <FormControl>
        <InputLabel>Diagnosis code</InputLabel>
        <Select labelId="diagnoses_select_label"
        id="diagnoses_select"
        multiple value={selectedDiagnosisCodes}
        onChange={handleDiagnosisCodeChange}
        label="Diagnosis code">
        {diagnosisCodes.map((diagnosis, i) => (
        <MenuItem key={i} value={diagnosis}> {diagnosis}</MenuItem>
      ))}
        </Select>
      </FormControl>


        <InputLabel style={{ marginTop: 20 }}>Type of entry</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={entrytype}
          onChange={onEntryTypeChange}
        >
        {entryTypeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select> 

        {entrytype === 'Hospital' ? 
        <><TextField
            label="discharge_date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={selectedDischarge}
            onChange={({ target }) => setSelectedDischarge(target.value)} />
            <TextField
              label="DischargeCriteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)} /></>
         :
        entrytype === 'OccupationalHealthcare' ? 
           <><TextField
              label="employer_name"
              fullWidth
              value={employername}
              onChange={({ target }) => setEmployername(target.value)} />
              
              <TextField
                label="sickleave_start"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)} />
            <TextField
            label="sickleave_end"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)} /></>
        :
         <>
         <FormControl>
          <InputLabel>Health Check Rating</InputLabel>
          <Select labelId="hcrating_selectlabel"
          id="hcrating_select"
          value={healthcearRating}
          onChange={onHCRChange}
          label="health_check_rating_select">
            <MenuItem value={"0"}>Healthy</MenuItem>
            <MenuItem value={"1"}>Low Risk</MenuItem>
            <MenuItem value={"2"}>High Risk</MenuItem>
            <MenuItem value={"3"}>Critical Risk</MenuItem>
          </Select>
         </FormControl>
         </>
        
         }

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntry;