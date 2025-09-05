import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import UniteConsommationForm from "./UniteConsommationForm.tsx";
import UniteConsommationList from "./UniteConsommationList.tsx";
import useGetFonctionsItems from "../../../personnel/fonction/hooks/useGetFonctionsItems.ts";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import {useGetUniteConsommationsQuery} from "../model/uniteConsommation.api.slice.ts";

const UniteConsommationView = () => {
  
  useDocumentTitle('Unités de consommations')
  useActivePage('pharmacy')
  
  const { data, isLoading, isFetching, refetch } = useGetUniteConsommationsQuery('LIST')
  
  const [unites, setUnites] = useState<UniteConsommation[]>([])
  
  useGetFonctionsItems(data, setUnites)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Unités de consommations'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <UniteConsommationForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <UniteConsommationList
            setUnites={setUnites}
            unites={unites}
            onRefresh={onRefresh}
            loader={isLoading}
            isFetching={isFetching}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(UniteConsommationView)
