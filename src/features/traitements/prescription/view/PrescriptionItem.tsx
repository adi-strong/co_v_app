import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {
  formatNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import type {Prescription} from "../model/prescriptionService.ts";
import RemovePrescriptionModal from "./RemovePrescriptionModal.tsx";
import moment from "moment";

export default function PrescriptionItem(props: {
  prescription: Prescription
  setPrescription: Dispatch<SetStateAction<Prescription[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    prescription,
    index,
    setPrescription,
    onRefresh,
  } = props
  
  const [isDel, setIsDel] = useState<boolean>(false)
  
  const {
    selected,
    fkPatient,
    fkAgent,
    id,
    releasedAt,
  } = prescription
  
  return (
    <>
      <tr>
        <td>
          <CheckField
            inline
            name='selected'
            value={selected}
            checked={selected}
            onChange={(): void => setSelectedDataItem(index, setPrescription)}
            className='me-0'
          />
          {formatNumberWithSpaces(id)}
        </td>
        
        <td
          id={`item-${index}`}
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
          className='text-uppercase'>
          {fkPatient
            ? <Link to={`/app/patients/${fkPatient.id}/${fkPatient?.slug}`}>{fkPatient?.fullName ?? fkPatient.nom}</Link>
            : '—'}
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td className='text-uppercase'>
          {fkAgent
            ? <Link to={`/app/agents/${fkAgent.id}/${fkAgent?.slug}`}>{fkAgent?.fullName ?? fkAgent.nom}</Link>
            : '—'}
        </td>
        
        <td>{`le ${releasedAt ? moment(releasedAt).format('DD/MM/YY à HH:mm') : '—'}`}</td>
        <td className='text-md-end'><Link to={`/app/prescriptions/${id}`}><i className='bi bi-eye-fill' /></Link></td>
      </tr>
      
      <RemovePrescriptionModal
        onHide={(): void => handleShow(setIsDel)}
        data={prescription}
        show={isDel}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
