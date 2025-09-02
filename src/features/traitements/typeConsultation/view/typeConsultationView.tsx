import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import TypeConsultForm from "./TypeConsultForm.tsx";
import TypeConsultList from "./TypeConsultList.tsx";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import {useGetTypeConsultationsQuery} from "../model/typeConsultation.api.slice.ts";
import useSetTypeConsultationsItems from "../hooks/useSetTypeConsultationsItems.ts";

const TypeConsultationView = () => {
  
  useDocumentTitle('Types des fiches de consultations')
  useActivePage('params')
  
  const [types, setTypes] = useState<TypeConsultation[]>([])
  
  const { data = [], isLoading, isFetching, refetch } = useGetTypeConsultationsQuery('LIST')
  
  useSetTypeConsultationsItems(data, setTypes)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Types des fiches de consultations'/>
      
      <Row>
        <Col md={3} className='mb-3'>
          <TypeConsultForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={9} className='mb-3'>
          <TypeConsultList
            isFetching={isFetching}
            onRefresh={onRefresh}
            setTypesConsults={setTypes}
            typesConsults={types}
            loader={isLoading}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(TypeConsultationView)
