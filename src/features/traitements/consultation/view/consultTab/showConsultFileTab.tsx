import type {Consultation} from "../../model/consultationService.ts";
import {Button} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {handleShow} from "../../../../../services/services.ts";
import AddPrescriptionFormModal from "../AddPrescriptionFormModal.tsx";
import HospModalForm from "../../../hospitalisation/view/HospModalForm.tsx";
import RemoveHospModal from "../../../hospitalisation/view/RemoveHospModal.tsx";

export default function ShowConsultFileTab({ consult, onRefresh }: { consult: Consultation; onRefresh: () => void }) {
  
  const [show, setShow] = useState<boolean>(false)
  const [isHosp, setIsHosp] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  return (
    <>
      {(consult.statut !== 'ANNULEE' && !consult.finished) && (
        <div>
          <Button size='sm' variant='outline-primary' onClick={(): void => handleShow(setShow)}>
            <i className='bi bi-file-earmark-text'/> Ajouter une prescription médicale
          </Button>
          
          {!consult?.hospitalisation && (
            <Button size='sm' className='mx-1' variant='outline-dark' onClick={(): void => handleShow(setIsHosp)}>
              <i className='bi bi-hospital-fill'/> Hospitalisation
            </Button>
          )}
          
          {consult?.hospitalisation && consult.hospitalisation.statut !== 'TERMINEE' && (
            <Button size='sm' className='mx-1' variant='outline-danger' onClick={(): void => handleShow(setIsDel)}>
              <i className='bi bi-trash3'/> Supprimer l'hospitalisation
            </Button>
          )}
        </div>
      ) as ReactNode}
      
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
    </>
  )
  
}
