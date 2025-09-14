import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {
  formatNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem,
  sexLabel
} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment/moment";
import type {Patient} from "../model/patientService.ts";
import RemovePatientModal from "./RemovePatientModal.tsx";

export default function PatientItem(props: {
  patient: Patient
  index: number
  onRefresh: () => void
}) {
  
  const {
    patient,
    index,
    onRefresh,
  } = props
  
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
          <Link to={`/app/patients/${patient.id}/${patient?.slug}`} className='text-uppercase'>
            {patient?.fullName ?? patient.nom}
          </Link>
          
          <div id={`actions-${index}`} className='text-capitalize' hidden>
            <Link to={`/app/patients/${patient.id}/${patient?.slug}/edit`} className='p-0 btn btn-sm btn-link'>
              Modifier
            </Link>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td className='text-uppercase'>
          {patient?.fkStructure ? (
            <Link to={`/app/structures/${patient.fkStructure.id}/${patient.fkStructure?.slug}`}>
              {patient.fkStructure.nom}
            </Link>
          ) : '—'}
        </td>
        <td>{sexLabel[patient.sexe]}</td>
        <td>{patient?.age ? `${formatNumberWithSpaces(patient.age)} ans` : '—'}</td>
        <td>{patient.tel}</td>
        <td>{patient?.createdAt
          ? `enregistré le ${moment(patient.createdAt).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
      </tr>
      
      <RemovePatientModal
        onHide={(): void => handleShow(setIsDel)}
        data={patient}
        show={isDel}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
