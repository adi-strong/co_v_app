import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Traitement} from "../model/traitementService.ts";

export default function useSetTraitementItems(
  data?: Traitement[],
  setState?: Dispatch<SetStateAction<Traitement[]>>
): void {
  
  useEffect(() => {
    if (data && data.length > 0 && setState) {
      setState(data)
    }
  }, [data, setState]);
  
}
