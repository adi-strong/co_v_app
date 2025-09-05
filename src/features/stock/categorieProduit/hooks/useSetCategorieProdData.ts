import type {CategorieProduit, SaveCategorieProduit} from "../model/categorieProduitService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetCategorieProdData(
  data?: CategorieProduit,
  setState?: Dispatch<SetStateAction<SaveCategorieProduit>>
): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState({ id: data.id, nom: data.nom })
    }
  }, [data, setState])
  
}
