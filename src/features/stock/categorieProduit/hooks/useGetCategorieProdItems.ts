import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {CategorieProduit} from "../model/categorieProduitService.ts";

export default function useGetCategorieProdItems(
  data?: CategorieProduit[],
  setState?: Dispatch<SetStateAction<CategorieProduit[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}

