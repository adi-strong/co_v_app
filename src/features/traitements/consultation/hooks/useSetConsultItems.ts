import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Consultation} from "../model/consultationService.ts";

export default function useSetConsultItems(data?: Consultation[], setState?: Dispatch<SetStateAction<Consultation[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
