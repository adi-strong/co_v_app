import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {BonEntree} from "../model/bonEntreeService.ts";

export default function useGetBonEntreeItems(data?: BonEntree[], setState?: Dispatch<SetStateAction<BonEntree[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
