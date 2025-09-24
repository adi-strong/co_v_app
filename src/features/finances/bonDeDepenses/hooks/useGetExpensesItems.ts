import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {BonDeDepense} from "../model/bonDeDepensesService.ts";

export default function useGetExpensesItems(data?: BonDeDepense[], setState?: Dispatch<SetStateAction<BonDeDepense[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
