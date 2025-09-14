import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {memo, ReactNode, useState} from "react";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useGetUniqueConsultationQuery} from "../model/consultation.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {getUniqueConsultHeadItems} from "../model/consultationService.ts";
import ShowConsultFileTab from "./consultTab/showConsultFileTab.tsx";
import ShowConsultAnamnesis from "./consultTab/showConsultAnamnesis.tsx";

const ShowConsultation = () => {
  
  const { id } = useParams()
  
  useDocumentTitle(`Fiche de consultation n°${id}`)
  useActivePage('treats')
  
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueConsultationQuery(id)
  
  const [tabKey, setTabKey] = useState<string>('file')
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title={`Fiche de consultation : ${data && data?.fkType ? data.fkType.nom : ''}`}/>
      
      <Row>
        <Col md={6} className='mb-2'>
          <Button disabled={isFetching} variant='link' size='sm' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1'/>) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm' />) as ReactNode}
            Actualiser la page
          </Button>
        </Col>
        
        <Col md={6} className='text-md-end'>
          {data && !data.finished && data.statut !== 'ANNULEE' && (
            <Link to={`/app/consultations/${id}/edit`} className='btn btn-sm btn-outline-primary me-1 mb-1'>
              <i className='bi bi-pencil-square'/> Modifier
            </Link>
          ) as ReactNode}
        </Col>
      </Row>
      
      <Card className='mt-3'>
        <Card.Body>
          <ul className='nav nav-lb-tab mb-4 px-4'>
            {getUniqueConsultHeadItems().map(t => (
              <li key={t.event} className='nav-item'>
                <Link
                  to={`#${t.event}`}
                  className={`nav-link ${tabKey === t.event ? 'active' : ''}`}
                  onClick={(): void => setTabKey(t.event)}>
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
          
          {!(isLoading && isError) && data && (
            <>
              {tabKey === 'file' && <ShowConsultFileTab consult={data} onRefresh={onRefresh}/>}
              {tabKey === 'anamnesis' && <ShowConsultAnamnesis consult={data}/>}
            </>
          )}
          
          {isLoading && <LogoLoader/>}
        </Card.Body>
      </Card>
    </BodyContainer>
)
}

export default memo(ShowConsultation)
