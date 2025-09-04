import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles} from "../../../components";
import {Col, Row} from "react-bootstrap";
import RdvList from "./RdvList.tsx";
import RdvForm from "./RdvForm.tsx";
import type {RendezVous} from "../model/rendezVousService.ts";
import useGetRdvItems from "../hooks/useGetRdvItems.ts";
import {useGetRendezVoussQuery} from "../model/rendezVous.api.slice.ts";

const RendezVousView = () => {
  
  useDocumentTitle('Rendez-vous')
  useActivePage('home')
  
  const { data, isLoading, isFetching, refetch } = useGetRendezVoussQuery('LIST')
  
  const [rdv, setRdv] = useState<RendezVous[]>([])
  
  useGetRdvItems(data, setRdv)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Rendez-vous' />
      
      <Row>
        <Col md={3} className='mb-3'>
          <RdvForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={9} className='mb-3'>
          <RdvList
            onRefresh={onRefresh}
            loader={isLoading}
            isFetching={isFetching}
            rdvs={rdv}
            setRdvs={setRdv}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(RendezVousView)
