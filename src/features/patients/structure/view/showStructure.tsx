import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles, SideContent} from "../../../../components";
import {memo, ReactNode, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetUniqueStructureQuery} from "../model/structure.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {handleShow} from "../../../../services/services.ts";
import RemoveStructureModal from "./RemoveStructureModal.tsx";
import UniqueStructureData from "./UniqueStructureData.tsx";
import StructureForm from "./StructureForm.tsx";
import StructurePatientsView from "./StructurePatientsView.tsx";

const ShowStructure = () => {
  
  useDocumentTitle('Structure')
  useActivePage('structures')
  
  const [show, setShow] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueStructureQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Structure'/>
      <Row>
        <Col md={6} className='mb-3'>
          <Button size='sm' disabled={isFetching} variant='outline-primary' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1' />) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm' />) as ReactNode}
            Actualiser
          </Button>
        </Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Button size='sm' disabled={isFetching} className='me-1' onClick={(): void => handleShow(setIsEdit)}>
            <i className='bi bi-pencil-square me-1'/> Modifier
          </Button>
          
          <Button size='sm' disabled={isFetching} variant='danger' onClick={(): void => handleShow(setShow)}>
            <i className='bi bi-trash me-1'/> Supprimer
          </Button>
        </Col>
      </Row>
      
      {isLoading && <LogoLoader/>}
      
      {!(isLoading && isError) && data && (
        <>
          <UniqueStructureData structure={data} />
          <Card className='mt-10'>
            <StructurePatientsView structureId={data.id} />
          </Card>
        </>
      ) as ReactNode}
      
      {data &&
        <RemoveStructureModal
          isRedirect
          data={data}
          show={show}
          onHide={(): void => handleShow(setShow)}
          onRefresh={onRefresh}
        />}
      
      {data &&
        <SideContent
          show={isEdit}
          onHide={(): void => handleShow(setIsEdit)}
          title='Modifier une structure'
          icon='pencil-square'
          children={
            <StructureForm
              onRefresh={onRefresh}
              data={data}
              onHide={(): void => handleShow(setIsEdit)}
            /> as ReactNode
          }
        />}
    </BodyContainer>
  )
  
}

export default memo(ShowStructure)
