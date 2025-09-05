import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";

export default function useGetUnitesItems(data?: UniteConsommation[], setState?: Dispatch<SetStateAction<UniteConsommation[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
