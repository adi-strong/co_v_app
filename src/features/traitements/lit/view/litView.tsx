import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import LitForm from "./LitForm.tsx";
import LitsList from "./LitsList.tsx";
import {useGetLitsQuery} from "../model/lit.api.slice.ts";
import useSetLitItems from "../hooks/useSetLitItems.ts";
import type {Lit} from "../model/litService.ts";

const LitView = () => {
  
  useDocumentTitle("Lits d'hospitalisation")
  useActivePage('params')
  
  const { data, isLoading, isFetching, refetch } = useGetLitsQuery('LIST')
  
  const [lits, setLits] = useState<Lit[]>([])
  
  useSetLitItems(data, setLits)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title="Lits d'hospitalisation"/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <LitForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <LitsList
            setLits={setLits}
            lits={lits}
            onRefresh={onRefresh}
            loader={isLoading}
            isFetching={isFetching}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(LitView)
