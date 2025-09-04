import {Dispatch, SetStateAction} from "react";
import PatientData from "./PatientData.tsx";
import type {Patient} from "../model/patientService.ts";

export default function PatientList({ patients, setPatients, onRefresh, isFetching, loader }: {
  patients: Patient[]
  setPatients: Dispatch<SetStateAction<Patient[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <PatientData
        patients={patients}
        setPatients={setPatients}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
