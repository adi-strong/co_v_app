import {BodyContainer, PageTitles, SideContent} from "../../../../components";
import {memo, ReactNode, useState} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Link, useParams} from "react-router-dom";
import {useGetUniqueServiceQuery} from "../model/service.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {handleShow} from "../../../../services/services.ts";
import RemoveServiceModal from "./RemoveServiceModal.tsx";
import ServiceForm from "./ServiceForm.tsx";
import AgentsByServiceList from "./AgentsByServiceList.tsx";

const ShowService = () => {
  
  useDocumentTitle('Service')
  useActivePage('agents')
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueServiceQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Service'/>
      
      <Row>
        <Col md={6} className='mb-3'>
          <Button size='sm' disabled={isFetching} variant='link' className='p-0' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1' />) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm' />) as ReactNode}
            Acutaliser
          </Button>
        </Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Button size='sm' disabled={isFetching} className='me-1' onClick={(): void => handleShow(setIsEdit)}>
            <i className='bi bi-pencil-square me-1'/>
            Modifier
          </Button>
          
          <Button size='sm' disabled={isFetching} variant='danger' onClick={(): void => handleShow(setIsDel)}>
            <i className='bi bi-trash me-1'/>
            Supprimer
          </Button>
        </Col>
      </Row>
      
      {!(isLoading && isError) && data && (
        <>
          <div className='mb-3'>
            <h2 className='fw-bold text-uppercase'>
              {data.nom}
            </h2>
            
            {data?.fkDepartement &&
              <Link to={`/app/departements/${data.fkDepartement.id}/${data.fkDepartement?.slug}`} className='text-uppercase'>
                {data.fkDepartement.nom}
              </Link>}
          </div>
          
          <AgentsByServiceList service={data}/>
          
          <RemoveServiceModal
            isRedirect
            onHide={(): void => handleShow(setIsDel)}
            data={data}
            show={isDel}
            onRefresh={onRefresh}
          />
          
          <SideContent
            show={isEdit}
            onHide={(): void => handleShow(setIsEdit)}
            title='Modifier le service'
            icon='pencil-square'
            children={
              <ServiceForm
                data={data}
                onRefresh={onRefresh}
                onHide={(): void => handleShow(setIsEdit)}
              /> as ReactNode
            }
          />
        </>
      )}
      
      {isLoading && <LogoLoader/>}
    </BodyContainer>
  )
  
}

export default memo(ShowService)
