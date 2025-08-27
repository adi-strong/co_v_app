import {useState} from "react";
import ProduitData from "./ProduitData.tsx";
import type {LotProduit} from "../model/lotProduitService.ts";

export default function ProduitList() {
  
  const [produits, setProduits] = useState<LotProduit[]>([])
  
  return (
    <>
      <ProduitData
        produits={produits}
        setProduits={setProduits}
      />
    </>
  )
  
}
