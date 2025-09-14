import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Prescription} from "../model/prescriptionService.ts";

export default function useSetPrescriptionItems(
  data?: Prescription[],
  setState?: Dispatch<SetStateAction<Prescription[]>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(data)
    }
  }, [data, setState])
  
}
