import {Button, Card, Col, Row} from "react-bootstrap";
import {ReactNode, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import {HospitalHeader} from "../../../../components";
import type {Lab} from "../model/labService.ts";
import type {CategoryExamPayload} from "../../categorieExam/model/categorieExam.slice.ts";
import useGetLabExamsByCats from "../../categorieExam/hooks/useGetLabExamsByCats.ts";
import BonAnalyseLaboItem from "./BonAnalyseLaboItem.tsx";
import moment from "moment";
import BonLabHeaderTab from "./BonLabHeaderTab.tsx";

export default function BonAnalyseLabo({ lab }: { lab: Lab }) {
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const [exams, setExams] = useState<CategoryExamPayload[]>([])
  
  const { examPrescrits, releasedAt } = lab
  
  useGetLabExamsByCats(examPrescrits, setExams)
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <Card className='mt-2'>
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
            <h4 className='fw-bold text-primary'>BON D'ANALYSE DE LABORATOIRE</h4>
          </div>
          
          <BonLabHeaderTab lab={lab} />
          
          <div className='mt-5'>
            <div style={{ border: '2px solid #000' }} />
            
            <div style={{ border: '1px solid #000', marginTop: 2, marginBottom: 2, padding: 2 }}>
              <Row className='pt-2 px-2 pe-2'>
                {exams.length > 0 && exams.map((category, index) => (
                  <BonAnalyseLaboItem key={index} category={category} />
                )) as ReactNode}
              </Row>
            </div>
            
            <div style={{ border: '2px solid #000' }} />
          </div>
          
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
