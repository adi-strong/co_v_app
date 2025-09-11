import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Lab} from "../model/labService.ts";

export default function useSetLabItems(data?: Lab[], setState?: Dispatch<SetStateAction<Lab[]>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(data)
    }
  }, [data, setState])
  
}
