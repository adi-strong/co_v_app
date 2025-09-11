import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {Consultation} from "../model/consultationService.ts";
import {Badge} from "react-bootstrap";
import {consultStatusColor, consultStatusLabel} from "../model/consultationService.ts";

export default function ConsultItem({ consultation, index, onRefresh }: {
  consultation: Consultation,
  index: number
  onRefresh: () => void
}) {
  
  const {
    id,
    fkType,
    fkPatient,
    statut,
    dateDebut,
  } = consultation
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/consultations/${id}`} className='text-uppercase'>
            {fkPatient?.fullName ?? '—'}
          </Link>
        </td>
        
        <td>{fkType ? fkType.nom.toUpperCase() : '—'}</td>
        <td><Badge bg={consultStatusColor[statut]}>{consultStatusLabel[statut]}</Badge></td>
        
        <td>{dateDebut
          ? `du ${moment(dateDebut).format('DD/MM/YY à HH:mm')}`
          : '—'}</td>
        
        <td className='text-md-end'>
          <Link to={`/app/consultations/${id}`} className='text-uppercase me-1'>
            <i className='bi bi-eye-fill'/>
          </Link>
        </td>
      </tr>
    </>
  )
  
}
