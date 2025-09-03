import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import ServiceForm from "./ServiceForm.tsx";
import ServicesList from "./ServicesList.tsx";
import useGetFonctionsItems from "../../fonction/hooks/useGetFonctionsItems.ts";
import type {Service} from "../model/serviceService.ts";
import {useGetServicesQuery} from "../model/service.api.slice.ts";

const ServiceView = () => {
  
  useDocumentTitle('Services')
  useActivePage('agents')
  
  const { data, isLoading, isFetching, refetch } = useGetServicesQuery('LIST')
  
  const [services, setServices] = useState<Service[]>([])
  
  useGetFonctionsItems(data, setServices)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Services'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <ServiceForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <ServicesList
            onRefresh={onRefresh}
            loader={isLoading}
            isFetching={isFetching}
            setServices={setServices}
            services={services}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(ServiceView)
