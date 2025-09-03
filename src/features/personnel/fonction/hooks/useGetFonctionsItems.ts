import type {Fonction} from "../model/fonctionService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useGetFonctionsItems(data?: Fonction[], setFonctions?: Dispatch<SetStateAction<Fonction[]>>): void {
  
  useEffect((): void => {
    if (data && setFonctions) {
      setFonctions(data)
    }
  }, [data, setFonctions])
  
}
