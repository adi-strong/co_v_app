import {memo, useState} from 'react';
import {BodyContainer, PageTitles, SearchComp} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Col, Row} from "react-bootstrap";
import CategorieLitList from "./CategorieLitList.tsx";
import CategorieLitForm from "./CategorieLitForm.tsx";
import {useGetCategoriesLitsQuery} from "../model/categorieLit.api.slice.ts";
import useSetCategoriesLitsItems from "../hooks/useSetCategoriesLitsItems.ts";
import type {CategorieLit} from "../model/categorieLitService.ts";

const CategorieLitView = () => {
  
  useDocumentTitle('Catégories des lits')
  useActivePage('params')
  
  const [categories, setCategories] = useState<CategorieLit[]>([])
  
  const { data = [], isLoading, isFetching, refetch } = useGetCategoriesLitsQuery('LIST')
  
  useSetCategoriesLitsItems(data, setCategories)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title="Catégories des lits d'h'ospitalisation"/>
      
      <Row>
        <Col md={5} className='mb-3'>
          <CategorieLitForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={7} className='mb-3'>
          <CategorieLitList
            categories={categories}
            onRefresh={onRefresh}
            setCategories={setCategories}
            loader={isLoading}
            isFetching={isFetching}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(CategorieLitView)
