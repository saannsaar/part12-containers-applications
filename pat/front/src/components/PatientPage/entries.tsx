
import { Entry, Patient } from "../../types";
import IndividualEntry from "./individualEntry";
import { Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";

interface Props {
    patient : Patient;
    entries : Entry[];
  }
  
  const Entries = ({ patient, entries } : Props ) => {
    console.log(patient, entries)
   return (
    <div>
        <h3>Entries</h3>
        <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Specialist</TableCell>
            <TableCell>Diagnosis codes</TableCell>
            <TableCell>Type of entry</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {entries.map((entry, index) => 
            <IndividualEntry entry={entry} key={index}/>
        )}
        </TableBody>
      </Table>
        
    </div>
   )
   
  };
  
  export default Entries;
  