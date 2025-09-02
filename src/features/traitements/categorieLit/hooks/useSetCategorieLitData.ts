import type {CategorieLit, SaveCategorieLit} from "../model/categorieLitService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetCategorieLitData(
  data?: CategorieLit,
  setCategory?: Dispatch<SetStateAction<SaveCategorieLit>>
): void {
  
  useEffect(() => {
    if (data && setCategory) {
      setCategory(prev => ({
        ...prev,
        id: data.id,
        nom: data.nom,
      }))
    }
  }, [data, setCategory])
  
}
