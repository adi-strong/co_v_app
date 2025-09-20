import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Produit, ProduitImage} from "../model/produitService.ts";

export default function useSetProduitImageData(data?: Produit, setState?: Dispatch<SetStateAction<ProduitImage>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(state => ({
        ...state,
        produitId: data.id,
      }))
    }
  }, [data, setState])
  
}
