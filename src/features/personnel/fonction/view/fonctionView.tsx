import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import FonctionForm from "./FonctionForm.tsx";
import FonctionsList from "./FonctionsList.tsx";
import {useGetFonctionsQuery} from "../model/fonction.api.slice.ts";
import type {Fonction} from "../model/fonctionService.ts";
import useGetFonctionsItems from "../hooks/useGetFonctionsItems.ts";

const FonctionView = () => {
  
  useDocumentTitle('Fonctions')
  useActivePage('agents')
  
  const { data, isLoading, isFetching, refetch } = useGetFonctionsQuery('LIST')
  
  const [fonctions, setFonctions] = useState<Fonction[]>([])
  
  useGetFonctionsItems(data, setFonctions)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Fonctions'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <FonctionForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <FonctionsList
            fonctions={fonctions}
            setFonctions={setFonctions}
            onRefresh={onRefresh}
            loader={isLoading}
            isFetching={isFetching}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(FonctionView)
