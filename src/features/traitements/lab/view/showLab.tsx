import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo, ReactNode, useState} from "react";
import BonAnalyseLabo from "./BonAnalyseLabo.tsx";
import {useGetUniqueLabQuery} from "../model/lab.api.slice.ts";
import {useParams} from "react-router-dom";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import BonRezLabo from "./BonRezLabo.tsx";
import LabResultModal from "./LabResultModal.tsx";
import {handleShow} from "../../../../services/services.ts";

const ShowLab = () => {
  
  useDocumentTitle('Laboratoire')
  useActivePage('treats')
  
  const [show, setShow] = useState<boolean>(false)
  
  const { id } = useParams()
  const { data, isLoading, isError, isFetching, refetch } = useGetUniqueLabQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Résultat(s) des analyses au labo'/>
      
      <Row>
        <Col md={6} className='mb-2'>
          <Button size='sm' disabled={isFetching} variant='link' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1'/>) as ReactNode}
            {isFetching && <Spinner className='me-1' animation='grow' size='sm' />}
            Actualiser la page
          </Button>
        </Col>
        
        {data && data?.fkConsultation && !data.fkConsultation?.finished && (
          <Col md={6} className='mb-2 text-md-end'>
            <Button
              disabled={isFetching}
              size='sm'
              variant='link'
              onClick={(): void => handleShow(setShow)}
              className='p-0'
              title='Analyses'>
              <i className='bi bi-flask-fill'/> Analyse
            </Button>
          </Col>
        )}
      </Row>
      
      {!(isLoading && isError) && data && <BonAnalyseLabo lab={data}/>}
      {!(isLoading && isError) && data && <BonRezLabo lab={data}/>}
      
      {isLoading && <LogoLoader/>}
      
      {data &&
        <LabResultModal
          show={show}
          onHide={(): void => handleShow(setShow)}
          onRefresh={onRefresh}
          data={data}
        />}
    </BodyContainer>
  )
  
}

export default memo(ShowLab)
