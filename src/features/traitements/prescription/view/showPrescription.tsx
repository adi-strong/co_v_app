import {BodyContainer, PageTitles} from "../../../../components";
import {Link, useParams} from "react-router-dom";
import {memo, ReactNode, useRef} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {useReactToPrint} from "react-to-print";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import PrescriptionToPrint from "./PrescriptionToPrint.tsx";
import {useGetUniquePrescriptionQuery} from "../model/prescription.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";

const ShowPrescription = () => {
  
  const { id } = useParams()
  const { data, isError, isLoading, isFetching, refetch } = useGetUniquePrescriptionQuery(id)
  
  useDocumentTitle(`Ordonnance n°${id}`)
  useActivePage('prescriptions')
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <BodyContainer>
      <PageTitles title={`Ordonnance n°${id}`} />
      
      <Row>
        <Col sm={6}>
          {data &&
            <Link to={`/app/consultations/${data?.fkConsultation?.id}`} className='btn btn-sm btn-primary'>
              <i className='bi bi-file-earmark-text'/> Voir la fiche
            </Link>}
        </Col>
        
        <Col sm={6} className='text-end'>
          <Button disabled={isFetching} className='me-1' size='sm' variant='outline-primary' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1'/>) as ReactNode}
            {isFetching && <Spinner className='me-1' animation='grow' size='sm' />}
            Actualiser
          </Button>
          
          <Button disabled={isFetching} size='sm' variant='outline-info' onClick={() => onPrint?.()}>
            <i className='bi bi-printer'/> Imprimer
          </Button>
        </Col>
      </Row>
      
      <Card className='mt-3'>
        <Card.Body>
          {!(isError && isLoading) && data && (
            <PrintableContent
              ref={contentRef}
              children={(<PrescriptionToPrint prescription={data}/>) as ReactNode}
              className='pt-7 px-7 pe-7'
            />
          )}
          
          {isLoading && <LogoLoader/>}
        </Card.Body>
      </Card>
    </BodyContainer>
  )
  
}

export default memo(ShowPrescription)
