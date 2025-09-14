import type {Lab} from "../model/labService.ts";
import {useRef} from "react";
import {useReactToPrint} from "react-to-print";
import {Button, Card, Col, Row} from "react-bootstrap";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import {HospitalHeader} from "../../../../components";
import BonLabHeaderTab from "./BonLabHeaderTab.tsx";
import BonRezLabItem from "./BonRezLabItem.tsx";
import moment from "moment";

export default function BonRezLabo({ lab }: { lab: Lab }) {
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const { examPrescrits, conclusion, releasedAt } = lab
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <Card className='mt-10'>
      <Card.Body>
        <div className='text-md-end'>
          <Button
            variant='link'
            size='sm'
            className='mb-1'
            onClick={() => onPrint?.()}
            title='Imprimer'>
            <i className='bi bi-printer-fill'/>
          </Button>
        </div>
        
        <PrintableContent ref={contentRef} className='pt-8 px-7 pe-7'>
          <HospitalHeader/>
          
          <div className='text-center'>
            <h4 className='fw-bold text-primary'>BON DE RÉSULTATS DE LABORATOIRE</h4>
          </div>
          
          <BonLabHeaderTab lab={lab}/>
          
          <table className='w-100 mt-5'>
            <thead>
            <tr>
              <th className='border-1 border-black text-black bg-light px-1 pe-1 text-center'>EXAMEN</th>
              <th className='border-1 border-black text-black bg-light px-1 pe-1 text-center'>RÉSULTAT(s)</th>
              <th className='border-1 border-black text-black bg-light px-1 pe-1 text-center'>VALEUR(s) NORMALE(s)</th>
            </tr>
            </thead>
            
            <tbody>
            {examPrescrits.length > 0 && examPrescrits.map((exam, index) => (
              <BonRezLabItem key={index} exam={exam}/>
            ))}
            </tbody>
          </table>
          
          <p className='mt-5 px-1 pe-1'>
            <b className='text-dark'>Conclusion : </b> <br/>
            {conclusion && <span className='white-space'>{conclusion}</span>}
          </p>
          
          <hr/>
          
          <Row className='mt-4 text-dark fst-italic'>
            <Col sm={6} className='mb-2'>
              le {releasedAt ? moment(releasedAt).format('DD/MM/YY') : '—'}
            </Col>
            
            <Col sm={6} className='mb-2 text-end'>
              <span className='text-decoration-underline text-uppercase'>signature</span>
            </Col>
          </Row>
        </PrintableContent>
      </Card.Body>
    </Card>
  )
  
}
