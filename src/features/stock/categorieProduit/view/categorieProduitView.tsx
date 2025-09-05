import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import CategorieProduitForm from "./CategorieProduitForm.tsx";
import CategorieProduitList from "./CategorieProduitList.tsx";
import type {CategorieProduit} from "../model/categorieProduitService.ts";
import useGetCategorieProdItems from "../hooks/useGetCategorieProdItems.ts";
import {useGetCategorieProduitsQuery} from "../model/categorieProduit.api.slice.ts";

const CategorieProduitView = () => {
  
  useDocumentTitle('Catégories des produits')
  useActivePage('pharmacy')
  
  const { data, isLoading, isFetching, refetch } = useGetCategorieProduitsQuery('LIST')
  
  const [categories, setCategories] = useState<CategorieProduit[]>([])
  
  useGetCategorieProdItems(data, setCategories)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Catégories des produits'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <CategorieProduitForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <CategorieProduitList
            setCategories={setCategories}
            loader={isLoading}
            isFetching={isFetching}
            onRefresh={onRefresh}
            categories={categories}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(CategorieProduitView)
