import type {Consultation} from "../../model/consultationService.ts";
import {Button} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {handleShow} from "../../../../../services/services.ts";
import AddConsultSignVitauxModalForm from "../AddConsultSignVitauxModalForm.tsx";
import AddConsultCATModalForm from "../AddConsultCATModalForm.tsx";

export default function ShowConsultTreatment({ consult, onRefresh }: { consult: Consultation; onRefresh: () => void }) {
  
  const [isCAT, setIsCAT] = useState<boolean>(false)
  const [isSign, setIsSign] = useState<boolean>(false)
  
  return (
    <>
      {consult.statut !== 'ANNULEE' && (
        <div>
          <Button variant='outline-danger' size='sm' className='me-1 mb-1' onClick={(): void => handleShow(setIsSign)}>
            <i className='bi bi-activity'/> Ajouter constantes vitales
          </Button>
          
          <Button variant='outline-primary' size='sm' className='mb-1' onClick={(): void => handleShow(setIsCAT)}>
            <i className='bi bi-journal-medical'/> Enregistrer C.A.T & Traitement
          </Button>
        </div>
      ) as ReactNode}
      
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
