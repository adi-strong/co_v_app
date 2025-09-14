import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Link, useParams} from "react-router-dom";
import {useGetUniqueDocumentSuiviQuery} from "../model/documentSuivi.api.slice.ts";
import {BodyContainer, PageTitles} from "../../../../components";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {memo, ReactNode, useRef, useState} from "react";
import {handleShow} from "../../../../services/services.ts";
import AddConsultSignVitauxModalForm from "../../consultation/view/AddConsultSignVitauxModalForm.tsx";
import AddConsultCATModalForm from "../../consultation/view/AddConsultCATModalForm.tsx";
import {useReactToPrint} from "react-to-print";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import ShowDetailsConsultFile from "../../consultation/view/consultTab/ShowDetailsConsultFile.tsx";
import UniqueDocSuiviData from "./UniqueDocSuiviData.tsx";

const ShowDocumentSuivi = () => {
  
  useDocumentTitle('Fiche de suivi du patient')
  useActivePage('treats')
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const { id } = useParams()
  const { data, isLoading, isError, isFetching, refetch } = useGetUniqueDocumentSuiviQuery(id)
  
  const [isCAT, setIsCAT] = useState<boolean>(false)
  const [isSign, setIsSign] = useState<boolean>(false)
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Fiche de suivi du patient' />
      
      {!(isLoading && isError) && data && (
        <Row>
          <Col md={6} className='mb-3'>
            <Button disabled={isFetching} variant='link' size='sm' onClick={onRefresh}>
              {isFetching && <Spinner className='me-1' animation='grow' size='sm' />}
              {!isFetching && (<i className='bi bi-arrow-clockwise me-1' />) as ReactNode}
              Actualiser la page
            </Button>
          </Col>
          
          <Col md={6} className='mb-3 text-md-end'>
            {data && !data.finished && (
              <Link to={`/app/suivis/${id}/edit`} className='me-1 btn btn-sm btn-outline-primary'>
                <i className='bi bi-pencil-square'/> Modifier
              </Link>
            )}
          </Col>
        </Row>
      )}
      
      <Card>
        <Card.Body>
          {isLoading && <LogoLoader/>}
          
          <Row>
            <Col md={6} className='mb-2'>
              <Button
                disabled={isFetching}
                variant='outline-danger' size='sm' className='me-1 mb-1'
                onClick={(): void => handleShow(setIsSign)}>
                <i className='bi bi-activity'/> Ajouter constantes vitales
              </Button>
              
              <Button
                disabled={isFetching}
                variant='outline-primary'
                size='sm'
                className='mb-1' onClick={(): void => handleShow(setIsCAT)}>
                <i className='bi bi-journal-medical'/> Enregistrer C.A.T & Traitement
              </Button>
            </Col>
            
            <Col md={6} className='mb-2 text-md-end'>
              <Button disabled={isFetching} className='mb-1' variant='outline-info' size='sm' onClick={() => onPrint?.()}>
                <i className='bi bi-printer-fill'/> Imprimer
              </Button>
            </Col>
          </Row>
          
          <PrintableContent ref={contentRef} className='pt-8 px-7 pe-7'>
            {!(isLoading && isError) && data && <UniqueDocSuiviData doc={data}/>}
          </PrintableContent>
        </Card.Body>
      </Card>
      
      <AddConsultSignVitauxModalForm
        show={isSign}
        onHide={(): void => handleShow(setIsSign)}
        suiviDdoc={data}
        onRefresh={onRefresh}
      />
      
      <AddConsultCATModalForm
        show={isCAT}
        onHide={(): void => handleShow(setIsCAT)}
        onRefresh={onRefresh}
        suiviDdoc={data}
      />
    </BodyContainer>
  )
  
}

export default memo(ShowDocumentSuivi)
