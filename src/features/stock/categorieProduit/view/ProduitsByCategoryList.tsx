import type {CategorieProduit} from "../model/categorieProduitService.ts";
import {useGetProduitsByCategoryQuery} from "../../produit/model/produit.api.slice.ts";
import {useState} from "react";
import type {Produit} from "../../produit/model/produitService.ts";
import useGetProduitsItems from "../../produit/hooks/useGetProduitsItems.ts";
import {Card} from "react-bootstrap";
import ProduitsList from "../../produit/view/ProduitsList.tsx";

export default function ProduitsByCategoryList({ category }: { category: CategorieProduit }) {
  
  const { data, isLoading, isFetching, refetch } = useGetProduitsByCategoryQuery(category.id)
  
  const [products, setProducts] = useState<Produit[]>([])
  
  useGetProduitsItems(data, setProducts)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <Card className='mt-4'>
      <ProduitsList
        produits={products}
        setProduits={setProducts}
        onRefresh={onRefresh}
        loader={isLoading}
        isFetching={isFetching}
      />
    </Card>
  )
  
}
