import {handleShow, onMouseEnterEvent, onMouseLeaveEvent} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment";
import type {Hospitalisation} from "../model/hospitalisationService.ts";
import {Badge, Button} from "react-bootstrap";
import {useState} from "react";
import HospModalForm from "./HospModalForm.tsx";
import RemoveHospModal from "./RemoveHospModal.tsx";
import {hospEntryColor, hospEntryLabel, modeSortieColor, modeSortieLabel} from "../model/hospitalisationService.ts";
import {consultStatusColor, consultStatusLabel} from "../../consultation/model/consultationService.ts";

export default function HospItem({ hosp, index, onRefresh }: {
  hosp: Hospitalisation
  index: number
  onRefresh: () => void
}) {
  
  const { id } = hosp
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          
          {hosp.fkPatient?.fullName?.toUpperCase() ?? hosp?.fkPatient?.nom?.toUpperCase()}
          
          <div id={`actions-${index}`} hidden>
            {(!hosp.finished && hosp.statut !== 'ANNULEE' && hosp.statut !== 'TERMINEE') && (
              <>
                <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
                  Clôturer
                </Button>
              </>
            )}
          </div>
        </td>
        
        <td>{hosp.fkLit.numero}</td>
        
        <td>
          <Badge bg={hospEntryColor[hosp.modeEntree]}>
            {hospEntryLabel[hosp.modeEntree]}
          </Badge>
        </td>
        
        <td>
          {hosp?.modeSortie ? (
            <Badge bg={modeSortieColor[hosp.modeSortie]}>
              {modeSortieLabel[hosp.modeSortie]}
            </Badge>
          ) : '—'}
        </td>
        
        <td>
          <Badge bg={consultStatusColor[hosp.statut]}>
            {consultStatusLabel[hosp.statut]}
          </Badge>
        </td>
        
        <td>{hosp?.dateAdmission
          ? `du le ${moment(hosp.dateAdmission).format('DD/MM/YY à HH:mm')}`
          : '—'}</td>
      </tr>
      
      <HospModalForm
        consult={hosp.fkConsultation}
        onRefresh={onRefresh}
        onHide={(): void => handleShow(setIsEdit)}
        show={isEdit}
        data={hosp}
      />
      
      <RemoveHospModal
        show={isDel}
        onRefresh={onRefresh}
        onHide={(): void => handleShow(setIsDel)}
        data={hosp}
      />
    </>
  )
  
}
