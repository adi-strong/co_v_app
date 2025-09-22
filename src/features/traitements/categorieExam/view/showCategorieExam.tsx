import {BodyContainer, PageTitles, SideContent} from "../../../../components";
import {memo, ReactNode, useState} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {useParams} from "react-router-dom";
import {useGetUniqueCategorieExamQuery} from "../model/categorieExam.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {formatNumberWithSpaces, handleShow} from "../../../../services/services.ts";
import ExamsByCategory from "./ExamsByCategory.tsx";
import RemoveCategorieExamModal from "./RemoveCategorieExamModal.tsx";
import CategorieExamForm from "./CategorieExamForm.tsx";

const ShowCategorieExam = () => {
  
  useDocumentTitle('Catégorie des examens')
  useActivePage('params')
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueCategorieExamQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Catégorie des examens'/>
      
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
          <Row>
            <Col md={9} className='mb-3'>
              <h2 className='fw-bold text-uppercase'>
                <i className='bi bi-tags me-1'/>
                {data.nom}
              </h2>
            </Col>
            
            <Col md={3} className='mb-3 text-md-end'>
              <b>{formatNumberWithSpaces(data.total)}</b> examen(s) au total
            </Col>
          </Row>
          
          <ExamsByCategory category={data} />
        </>
      )}
      
      {isLoading && <LogoLoader/>}
      
      {data && (
        <>
          <RemoveCategorieExamModal
            isRedirect
            onHide={(): void => handleShow(setIsDel)}
            data={data}
            show={isDel}
            onRefresh={onRefresh}
          />
          
          <SideContent
            show={isEdit}
            onHide={(): void => handleShow(setIsEdit)}
            title='Modifier la catégorie'
            icon='pencil-square'
            children={
              <CategorieExamForm
                data={data}
                onRefresh={onRefresh}
                onHide={(): void => handleShow(setIsEdit)}
              /> as ReactNode
            }
          />
        </>
      )}
    </BodyContainer>
  )
  
}

export default memo(ShowCategorieExam)
