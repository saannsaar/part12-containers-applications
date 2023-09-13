import { Dispatch, useState } from "react";
import { EntryFormValues, Patient } from "../../../types";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import AddEntry from "../EntryForm/addentry";


interface Props {
    modalOpen: boolean;
    onClose: () => void;
    error?: string;
    patient: Patient;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setPatient:  React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const EntryForm = ({ modalOpen, onClose, setError, patient, setModalOpen, setPatient, error } : Props ) => {

    const [open, setOpen] = useState(false);

    const handleOpenForm = () => {
        setOpen(true)
        console.log("open form")
    }
    const handleClose = () => {
        setOpen(false)
    }



    return (
        <div>
            <Button variant="outlined" onClick={handleOpenForm}>
                Add new entry for {patient.name}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New entry</DialogTitle>
                <DialogContent>
                    <AddEntry setModalOpen={setOpen} setPatient={setPatient} onCancel={handleClose} setError={setError} patient={patient} error={error}/>
                </DialogContent>
            </Dialog>
        </div>
    )
  };

  export default EntryForm;