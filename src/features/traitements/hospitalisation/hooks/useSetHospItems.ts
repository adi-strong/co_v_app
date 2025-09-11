import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Hospitalisation} from "../model/hospitalisationService.ts";

export default function useSetHospItems(data?: Hospitalisation[], setState?: Dispatch<SetStateAction<Hospitalisation[]>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(data)
    }
  }, [data, setState])
  
}
