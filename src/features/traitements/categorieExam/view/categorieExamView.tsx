import {memo, useState} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import CategorieExamForm from "./CategorieExamForm.tsx";
import CategorieExamList from "./CategorieExamList.tsx";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import useSetCategoriesExamensItems from "../hooks/useSetCategoriesExamensItems.ts";
import type {CategorieExam} from "../model/categorieExamService.ts";
import {useGetCategoriesExamsQuery} from "../model/categorieExam.api.slice.ts";

const CategorieExamView = () => {
  
  useDocumentTitle('Catégories des examens')
  useActivePage('params')
  
  const [categories, setCategories] = useState<CategorieExam[]>([])
  
  const { data = [], isLoading, isFetching, refetch } = useGetCategoriesExamsQuery('LIST')
  
  useSetCategoriesExamensItems(data, setCategories)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Catégories des examens'/>
      
      <Row>
        <Col md={5} className='mb-3'>
          <CategorieExamForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={7} className='mb-3'>
          <CategorieExamList
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

export default memo(CategorieExamView)
