import type {Structure} from "../model/structureService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useGetStructuresItems(data?: Structure[], setState?: Dispatch<SetStateAction<Structure[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
