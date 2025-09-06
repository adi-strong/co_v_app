import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Appro} from "../model/approService.ts";

export default function useGetProduitsItems(data?: Appro[], setState?: Dispatch<SetStateAction<Appro[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
