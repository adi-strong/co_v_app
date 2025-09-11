import type {SaveTraitement, Traitement} from "../model/traitementService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetTraitementData(data?: Traitement, setState?: Dispatch<SetStateAction<SaveTraitement>>): void {
  
  useEffect(() => {
    if (data && setState) {
      setState({
        id: data.id,
        nom: data.nom,
        prixHt: Number(data.prixHt),
        prixTtc: Number(data.prixTtc)
      })
    }
  }, [data, setState]);
  
}
