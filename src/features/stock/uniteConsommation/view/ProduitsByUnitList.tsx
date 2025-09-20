import {useGetProduitsByUnityQuery} from "../../produit/model/produit.api.slice.ts";
import {useState} from "react";
import type {Produit} from "../../produit/model/produitService.ts";
import useGetProduitsItems from "../../produit/hooks/useGetProduitsItems.ts";
import {Card} from "react-bootstrap";
import ProduitsList from "../../produit/view/ProduitsList.tsx";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";

export default function ProduitsByUnitList({ unit }: { unit: UniteConsommation }) {
  
  const { data, isLoading, isFetching, refetch } = useGetProduitsByUnityQuery(unit.id)
  
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
