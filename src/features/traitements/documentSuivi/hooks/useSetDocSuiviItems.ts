import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {DocumentSuivi} from "../model/documentSuiviService.ts";

export default function useSetDocSuiviItems(data?: DocumentSuivi[], setState?: Dispatch<SetStateAction<DocumentSuivi[]>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(data)
    }
  }, [data, setState])
  
}
