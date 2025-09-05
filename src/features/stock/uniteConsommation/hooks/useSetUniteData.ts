import type {SaveUniteConsommation, UniteConsommation} from "../model/uniteConsommationService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetUniteData(
  data?: UniteConsommation,
  setState?: Dispatch<SetStateAction<SaveUniteConsommation>>
): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState({ id: data.id, nom: data.nom })
    }
  }, [data, setState])
  
}
