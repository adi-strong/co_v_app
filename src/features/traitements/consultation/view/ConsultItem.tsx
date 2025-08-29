import {
  onMouseEnterEvent,
  onMouseLeaveEvent,
} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {Consultation} from "../model/consultationService.ts";

export default function ConsultItem({ consultation, index }: { consultation: Consultation, index: number }) {
  
  const { id, slug } = consultation
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <Link to={`/app/consultation/${id}/${slug}`}>
            {consultation?.fkPatient?.fullName ?? '—'}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Link to={`/app/consultations/${consultation.id}/${consultation?.slug}/edit`} className='p-0 btn btn-sm btn-link'>
              Retoucher
            </Link>
          </div>
        </td>
        
        <td>{consultation?.dateDebut
          ? `du le ${moment(consultation.dateDebut).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
        
        <td>{consultation?.dateFin
          ? `au le ${moment(consultation.dateFin).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
      </tr>
    </>
  )
  
}
