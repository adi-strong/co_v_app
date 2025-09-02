import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {CategorieLit} from "../model/categorieLitService.ts";

export default function useSetCategoriesLitsItems(
  data: CategorieLit[],
  setCategories: Dispatch<SetStateAction<CategorieLit[]>>
): void {
  
  useEffect(() => {
    if (data && data.length > 0) {
      setCategories(data)
    }
  }, [data, setCategories]);
  
}
