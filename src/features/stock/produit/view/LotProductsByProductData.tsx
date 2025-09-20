import type {Produit} from "../model/produitService.ts";
import {useGetLotProduitsByProductQuery} from "../../lotProduit/model/lotProduit.api.slice.ts";
import {useState} from "react";
import type {LotProduit} from "../../lotProduit/model/lotProduitService.ts";
import useGetLotsProduitsItems from "../../lotProduit/hooks/useGetLotsProduitsItems.ts";
import {Card} from "react-bootstrap";
import LotProdList from "../../lotProduit/view/LotProdList.tsx";

export default function LotProductsByProductData({ product }: { product: Produit }) {
  
  const { data, isLoading, isFetching, refetch } = useGetLotProduitsByProductQuery(product.id)
  
  const [products, setProducts] = useState<LotProduit[]>([])
  
  useGetLotsProduitsItems(data, setProducts)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <Card className='mt-8'>
      <LotProdList
        produits={products}
        setProduits={setProducts}
        onRefresh={onRefresh}
        loader={isLoading}
        isFetching={isFetching}
      />
    </Card>
  )
  
}
