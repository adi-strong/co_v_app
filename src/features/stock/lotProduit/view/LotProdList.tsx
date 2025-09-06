import {Dispatch, SetStateAction} from "react";
import type {LotProduit} from "../model/lotProduitService.ts";
import LotProdData from "./LotProdData.tsx";

export default function LotProdList({ produits, setProduits, onRefresh, isFetching, loader }: {
  produits: LotProduit[]
  setProduits: Dispatch<SetStateAction<LotProduit[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <LotProdData
        product={produits}
        setProducts={setProduits}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
