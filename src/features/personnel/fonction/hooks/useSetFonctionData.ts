import type {Fonction, SaveFonction} from "../model/fonctionService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetFonctionData(data?: Fonction, setFonction?: Dispatch<SetStateAction<SaveFonction>>): void {
  
  useEffect((): void => {
    if (data && setFonction) {
      setFonction({ nom: data.nom, id: data.id })
    }
  }, [data, setFonction])
  
}
