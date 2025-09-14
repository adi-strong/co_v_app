import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {Lab} from "../model/labService.ts";
import {formatNumberWithSpaces, handleShow, subStr} from "../../../../services/services.ts";
import {Button} from "react-bootstrap";
import {useState} from "react";
import LabResultModal from "./LabResultModal.tsx";

export default function LabItem({ lab, onRefresh }: { lab: Lab, onRefresh: () => void }) {
  
  const [show, setShow] = useState<boolean>(false)
  
  const {
    id,
    fkConsultation,
    releasedAt,
    fkPatient,
    fkAgent,
  } = lab
  
  const agent = fkAgent ? fkAgent : null
  
  return (
    <>
      <tr>
        <td className='text-uppercase'>
          <Link to={`/app/labs/${id}`}>
            {fkPatient?.fullName ?? '—'}
          </Link>
        </td>
        
        <td className='text-uppercase' title={fkConsultation?.fkType ? fkConsultation.fkType.nom : ''}>
          {fkConsultation ? (
            <Link to={`/app/consultations/${fkConsultation.id}`}>
              <span className='text-dark me-1'>#{formatNumberWithSpaces(fkConsultation.id)}</span>:
              {fkConsultation?.fkType ? subStr(fkConsultation.fkType.nom, 20) : '—'}
            </Link>
          ) : '—'}
        </td>
        
        <td className='text-uppercase'>
          {agent ? (
            <Link to={`/app/agents/${agent.id}/${agent?.slug}`}>
              {agent?.fullName ?? agent.nom}
            </Link>
          ) : '—'}
        </td>
        
        <td>{releasedAt ? `du ${moment(releasedAt).format('DD/MM/YY à HH:mm')}` : '—'}</td>
        <td className='text-md-end'>
          <Link to={`/app/labs/${lab.id}`}>
            <i className='bi bi-eye-fill'/>
          </Link>
          
          {!lab.fkConsultation.finished && (
            <>
              {' | '}
              <Button size='sm' variant='link' onClick={(): void => handleShow(setShow)} className='p-0' title='Analyses'>
                <i className='bi bi-file-earmark-medical-fill'/>
              </Button>
            </>
          )}
        </td>
      </tr>
      
      <LabResultModal
        show={show}
        onHide={(): void => handleShow(setShow)}
        onRefresh={onRefresh}
        data={lab}
      />
    </>
  )
  
}
