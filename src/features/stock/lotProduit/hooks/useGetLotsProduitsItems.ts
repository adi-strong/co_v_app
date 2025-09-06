import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {LotProduit} from "../model/lotProduitService.ts";

export default function useGetLotsProduitsItems(data?: LotProduit[], setState?: Dispatch<SetStateAction<LotProduit[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
