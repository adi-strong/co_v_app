import {formatNumberWithSpaces, subStr} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment";
import type {DocumentSuivi} from "../model/documentSuiviService.ts";
import {consultStatusColor, consultStatusLabel} from "../../consultation/model/consultationService.ts";
import {Badge} from "react-bootstrap";

export default function DocumentItem({ doc }: { doc: DocumentSuivi }) {
  
  const {
    id,
    fkConsultation,
    statut,
    dateDebut,
  } = doc
  
  return (
    <>
      <tr>
        <td className='text-uppercase'>
          <Link to={`/app/suivis/${id}`}>
            {doc?.fkPatient?.fullName ?? '—'}
          </Link>
        </td>
        
        <td className='text-uppercase' title={fkConsultation?.fkType?.nom ?? ''}>
          {fkConsultation ? (
            <Link to={`/app/consultations/${fkConsultation.id}`}>
              <span className='text-dark me-1'>#{formatNumberWithSpaces(fkConsultation.id)}</span>:
              {subStr(fkConsultation?.fkType ? fkConsultation.fkType.nom : '', 30)}
            </Link>
          ) : '—'}
        </td>
        
        <td>
          <Badge bg={consultStatusColor[statut]}>{consultStatusLabel[statut]}</Badge>
        </td>
        
        <td>{dateDebut
          ? `du le ${moment(dateDebut).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
        
        <td className='text-md-end'>
          <Link to={`/app/suivis/${id}`}>
            <i className='bi bi-eye-fill'/>
          </Link>
          
          {' | '}
          
          <Link to={`/app/suivis/${id}/edit`}>
            <i className='bi bi-pencil-square'/>
          </Link>
        </td>
      </tr>
    </>
  )
  
}
