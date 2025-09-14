import type {Consultation} from "../../model/consultationService.ts";
import {Button, Col, Row} from "react-bootstrap";
import {ReactNode, useRef, useState} from "react";
import {handleShow} from "../../../../../services/services.ts";
import AddPrescriptionFormModal from "../AddPrescriptionFormModal.tsx";
import HospModalForm from "../../../hospitalisation/view/HospModalForm.tsx";
import RemoveHospModal from "../../../hospitalisation/view/RemoveHospModal.tsx";
import ShowDetailsConsultFile from "./ShowDetailsConsultFile.tsx";
import PrintableContent from "../../../../../components/PrintableContent.tsx";
import {useReactToPrint} from "react-to-print";
import AddConsultSignVitauxModalForm from "../AddConsultSignVitauxModalForm.tsx";
import AddConsultCATModalForm from "../AddConsultCATModalForm.tsx";

export default function ShowConsultFileTab({ consult, onRefresh }: { consult: Consultation; onRefresh: () => void }) {
  
  const [show, setShow] = useState<boolean>(false)
  const [isHosp, setIsHosp] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  const [isCAT, setIsCAT] = useState<boolean>(false)
  const [isSign, setIsSign] = useState<boolean>(false)
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <>
      {(consult.statut !== 'ANNULEE' && !consult.finished) && (
        <Row>
          <Col md={8} className='mb-2'>
            <Button size='sm' variant='outline-primary' className='mb-1' onClick={(): void => handleShow(setShow)}>
              <i className='bi bi-file-earmark-text'/> Prescription
            </Button>
            
            {!consult?.hospitalisation && (
              <Button size='sm' className='mx-1 mb-1' variant='outline-dark' onClick={(): void => handleShow(setIsHosp)}>
                <i className='bi bi-hospital-fill'/> Hospitalisation
              </Button>
            ) as ReactNode}
            
            {consult?.hospitalisation && consult.hospitalisation.statut !== 'TERMINEE' && (
              <Button size='sm' className='mx-1 mb-1' variant='outline-danger mx' onClick={(): void => handleShow(setIsDel)}>
                <i className='bi bi-trash3'/> Supprimer l'hospitalisation
              </Button>
            ) as ReactNode}
            
            <Button variant='outline-danger' size='sm' className='me-1 mb-1 mx-1' onClick={(): void => handleShow(setIsSign)}>
              <i className='bi bi-activity'/> Constantes vitales
            </Button>
            
            <Button variant='outline-primary' size='sm' className='mb-1' onClick={(): void => handleShow(setIsCAT)}>
              <i className='bi bi-journal-medical'/> C.A.T & Traitement
            </Button>
          </Col>
          
          <Col md={4} className='mb-2 text-md-end'>
            <Button variant='outline-info' size='sm' className='mb-1' onClick={() => onPrint?.()}>
              <i className='bi bi-printer-fill'/> Imprimer
            </Button>
          </Col>
        </Row>
      ) as ReactNode}
      
      <PrintableContent ref={contentRef} className='pt-8 px-7 pe-7'>
        <ShowDetailsConsultFile consult={consult} />
      </PrintableContent>
      
      <AddPrescriptionFormModal
        show={show}
        onRefresh={onRefresh}
        onHide={(): void => handleShow(setShow)}
        consult={consult}
      />
      
      <HospModalForm
        consult={consult}
        onRefresh={onRefresh}
        onHide={(): void => handleShow(setIsHosp)}
        show={isHosp}
      />
      
      {consult?.hospitalisation && (
        <RemoveHospModal
          show={isDel}
          onRefresh={onRefresh}
          onHide={(): void => handleShow(setIsDel)}
          data={consult.hospitalisation}
        />
      )}
      
      <AddConsultSignVitauxModalForm
        show={isSign}
        onHide={(): void => handleShow(setIsSign)}
        consult={consult}
        onRefresh={onRefresh}
      />
      
      <AddConsultCATModalForm
        show={isCAT}
        onHide={(): void => handleShow(setIsCAT)}
        onRefresh={onRefresh}
        consult={consult}
      />
    </>
  )
  
}
