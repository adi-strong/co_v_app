import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import {useGetTraitementsQuery} from "../model/traitement.api.slice.ts";
import type {Traitement} from "../model/traitementService.ts";
import useSetTraitementItems from "../hooks/useSetTraitementItems.ts";
import TraitementForm from "./TraitementForm.tsx";
import TraitementList from "./TraitementList.tsx";

const TraitementView = () => {
  
  useDocumentTitle('Traitements')
  useActivePage('params')
  
  const { data, isLoading, isFetching, refetch } = useGetTraitementsQuery('LIST')
  
  const [treatments, setTreatments] = useState<Traitement[]>([])
  
  useSetTraitementItems(data, setTreatments)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Traitements'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <TraitementForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <TraitementList
            traitements={treatments}
            setTraitements={setTreatments}
            loader={isLoading}
            isFetching={isFetching}
            onRefresh={onRefresh}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(TraitementView)
