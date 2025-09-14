import type {Patient, PatientImage} from "./patientService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetPatientImageData(data?: Patient, setState?: Dispatch<SetStateAction<PatientImage>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(state => ({
        ...state,
        patientId: data.id,
      }))
    }
  }, [data, setState])
  
}
