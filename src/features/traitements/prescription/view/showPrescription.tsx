import {BodyContainer, PageTitles} from "../../../../components";
import {useParams} from "react-router-dom";
import {memo, ReactNode, useRef} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Button, Card, Col, Row} from "react-bootstrap";
import {useReactToPrint} from "react-to-print";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import PrescriptionToPrint from "./PrescriptionToPrint.tsx";

const ShowPrescription = () => {
  
  const { id } = useParams()
  
  useDocumentTitle(`Ordonnance n°${id}`)
  useActivePage('prescriptions')
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <BodyContainer>
      <PageTitles title={`Ordonnance n°${id}`}/>
      
      <Row>
        <Col sm={6}>
          <Button disabled={false} size='sm' onClick={() => onPrint?.()}>
            <i className='bi bi-file-earmark-text'/> Voir la fiche
          </Button>
        </Col>
        
        <Col sm={6} className='text-end'>
          <Button disabled={false} size='sm' variant='outline-info' onClick={() => onPrint?.()}>
            <i className='bi bi-printer'/> Imprimer
          </Button>
        </Col>
      </Row>
      
      <Card className='mt-3'>
        <Card.Body>
          <PrintableContent
            ref={contentRef}
            children={(<PrescriptionToPrint/>) as ReactNode}
            className='pt-7 px-7 pe-7'
          />
        </Card.Body>
      </Card>
    </BodyContainer>
  )
  
}

export default memo(ShowPrescription)
