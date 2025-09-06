import {Dispatch, SetStateAction} from "react";
import type {Produit} from "../model/produitService.ts";
import ProduitData from "./ProduitData.tsx";

export default function ProduitsList({ produits, setProduits, onRefresh, isFetching, loader }: {
  produits: Produit[]
  setProduits: Dispatch<SetStateAction<Produit[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <ProduitData
        product={produits}
        setProducts={setProduits}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
