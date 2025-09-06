import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo, useState} from "react";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import {useGetLotProduitsQuery} from "../model/lotProduit.api.slice.ts";
import type {LotProduit} from "../model/lotProduitService.ts";
import useGetLotsProduitsItems from "../hooks/useGetLotsProduitsItems.ts";
import LotProdList from "./LotProdList.tsx";

const LotProdView = () => {
  
  useDocumentTitle('Produits')
  useActivePage('pharmacy')
  
  const { data, isLoading, isFetching, refetch } = useGetLotProduitsQuery('LIST')
  
  const [products, setProducts] = useState<LotProduit[]>([])
  
  useGetLotsProduitsItems(data, setProducts)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Produits' />
      
      <Card>
        <LotProdList
          produits={products}
          setProduits={setProducts}
          onRefresh={onRefresh}
          loader={isLoading}
          isFetching={isFetching}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(LotProdView)
