import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Lit} from "../model/litService.ts";

export default function useSetLitItems(
  data?: Lit[],
  setState?: Dispatch<SetStateAction<Lit[]>>
): void {
  
  useEffect(() => {
    if (data && data.length > 0 && setState) {
      setState(data)
    }
  }, [data, setState]);
  
}
