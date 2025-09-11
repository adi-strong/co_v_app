import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Examen} from "../model/examenService.ts";

export default function useSetExamsItems(
  data?: Examen[],
  setCategories?: Dispatch<SetStateAction<Examen[]>>
): void {
  
  useEffect(() => {
    if (data && data.length > 0 && setCategories) {
      setCategories(data)
    }
  }, [data, setCategories]);
  
}
