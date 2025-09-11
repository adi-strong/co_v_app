import type {Hospitalisation, SaveHospitalisation} from "../model/hospitalisationService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetHospData(
  data?: Hospitalisation,
  setState?: Dispatch<SetStateAction<SaveHospitalisation>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(prev => ({
        ...prev,
        id: data.id,
        finished: data.finished,
        dateSortie: data?.dateSortie ? data.dateSortie.substring(0, 10) : '',
      }))
    }
  }, [data, setState])
  
}
