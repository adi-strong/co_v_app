import type {Patient} from "../model/patientService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useGetPatientsItems(data?: Patient[], setPatients?: Dispatch<SetStateAction<Patient[]>>): void {
  
  useEffect((): void => {
    if (data && setPatients) {
      setPatients(data)
    }
  }, [data, setPatients])
  
}
