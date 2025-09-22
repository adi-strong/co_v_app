import {BodyContainer, PageTitles, SideContent} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo, ReactNode, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useGetUniqueDepartementQuery} from "../model/departement.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {handleShow} from "../../../../services/services.ts";
import RemoveDepartmentModal from "./RemoveDepartmentModal.tsx";
import DepartementForm from "./DepartementForm.tsx";
import {getDepartmentTabs} from "../model/departementService.ts";
import AgentsByDepartmentList from "./AgentsByDepartmentList.tsx";
import ServicesByDepartment from "./ServicesByDepartment.tsx";

const ShowDepartement = () => {
  
  useDocumentTitle('Département')
  useActivePage('agents')
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  const [key, setKey] = useState<string>('agents')
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueDepartementQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Département'/>
      
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
          </div>
          
          <ul className='nav nav-lb-tab mb-4 px-4'>
            {getDepartmentTabs().map(t => (
              <li key={t.event} className='nav-item'>
                <Link
                  to={`#${t.event}`}
                  className={`nav-link ${key === t.event ? 'active' : ''}`}
                  onClick={(): void => setKey(t.event)}>
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
          
          {key === 'agents' && <AgentsByDepartmentList department={data}/>}
          {key === 'services' && <ServicesByDepartment department={data}/>}
          
          <RemoveDepartmentModal
            isRedirect
            onHide={(): void => handleShow(setIsDel)}
            data={data}
            show={isDel}
            onRefresh={onRefresh}
          />
          
          <SideContent
            show={isEdit}
            onHide={(): void => handleShow(setIsEdit)}
            title='Modifier le département'
            icon='pencil-square'
            children={
              <DepartementForm
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

export default memo(ShowDepartement)
