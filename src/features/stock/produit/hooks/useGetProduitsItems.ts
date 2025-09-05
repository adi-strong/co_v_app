import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Produit} from "../model/produitService.ts";

export default function useGetProduitsItems(data?: Produit[], setState?: Dispatch<SetStateAction<Produit[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
