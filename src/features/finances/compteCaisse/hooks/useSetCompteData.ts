import type {CompteCaisse, SaveCompteCaisse} from "../model/compteCaisseService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetCompteData(data?: CompteCaisse, setState?: Dispatch<SetStateAction<SaveCompteCaisse>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState({
        taux: Number(data.taux),
        first: data.first.code,
        last: data.last.code,
        nom: data.nom,
        id: data.id,
        estCeParDefaut: data.estCeParDefaut,
      })
    }
  }, [data, setState])
  
}
