
import { Table, TableHead, TableRow, TableCell} from "@mui/material";
import { Entry, Patient, DiagnoseEntry } from "../../types";
import { useEffect, useState } from "react";
import diagnoseService from "../../services/diagnosis"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteOutlined } from "@mui/icons-material";
import { green, red, yellow } from "@mui/material/colors";

interface Props {
    entry : Entry;
    
  }
  

const OccupationalHCEntry = ({ entry }: Props ) => {
   

    return (
       
             
        <><TableCell> 
            <WorkIcon></WorkIcon>
        </TableCell></>
              
    )
}

const HealthCareEntry = ({ entry }: Props ) => {
    
    return (


              <><TableCell> 
                <MedicalInformationIcon></MedicalInformationIcon>
        </TableCell>
        
        {(() => {
            
            // Have to check why switch needs the type checked here to work
            if (entry.type === "HealthCheck") {
                switch (entry.healthCheckRating) {
                    case 0: 
                        return <TableCell>
                            <FavoriteOutlined sx={{ color: green[500] }}></FavoriteOutlined>
                        </TableCell>
                    case 1:
                        return <TableCell>
                            <FavoriteOutlined sx={{ color: yellow[500] }}></FavoriteOutlined>
                        </TableCell>
                    case 2:
                        return <TableCell><FavoriteOutlined sx={{ color: red[500] }}></FavoriteOutlined></TableCell>
                }
            }
            
        })()}
            </>
        
              
         
    )
}

const HospitalEntry = ({ entry }: Props ) => {
    

    return (
       

        <><TableCell> 
            <LocalHospitalIcon></LocalHospitalIcon>
        </TableCell></>
              
    )
}

  const IndividualEntry = ({ entry } : Props ) => {

    const [diagnosis, setDiagnosis] = useState<DiagnoseEntry[] | undefined>();

    useEffect(() => {
        const getDiagnoses = async () => {
    
                await diagnoseService.getAll().then((response) => {
                    setDiagnosis(response)
                }).catch((error) => {
                    console.log(error.message);
                })
            
        }
        void getDiagnoses();
    }, [diagnosis])

    const diagnoseName = ( code: string ) => {
        if (diagnosis) {
            const findName = Object.values(diagnosis).find((diagnose: DiagnoseEntry) => diagnose.code === code);
            if (findName) {
                return findName.name;
            }
            return null;
        }
        
    }
    return(
    
            <TableRow key={entry.id}>
    
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>
                   {entry.specialist}
                  </TableCell>
                  
                   {entry.diagnosisCodes !== undefined ?
                    <TableCell> 
                        {entry.diagnosisCodes?.map((d, i)  => (
                    <li key={i}>{d} {diagnoseName(d)}</li>
                   ))}</TableCell> :
                   <TableCell> No diagnosis codes </TableCell>
                  }

        {(() => {
            switch (entry.type) {
                case 'HealthCheck': 
                    return <HealthCareEntry entry={entry} /> 
                case 'Hospital':
                    return <HospitalEntry entry={entry} />
                case 'OccupationalHealthcare':
                    return <OccupationalHCEntry entry={entry}/>
            }
        })()}
                </TableRow>
     
    )

   
    
    console.log( entry)
    
    
    

  
    
   
  };
  
  export default IndividualEntry;
  