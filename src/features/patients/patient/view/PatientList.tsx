import {useState} from "react";
import {getPatientFakeData} from "../model/patientService.ts";
import PatientData from "./PatientData.tsx";

export default function PatientList() {
  
  const [patients, setPatients] = useState(getPatientFakeData())
  
  return (
    <>
      <PatientData
        patients={patients}
        setPatients={setPatients}
      />
    </>
  )
  
}
