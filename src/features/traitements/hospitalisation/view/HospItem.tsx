import {onMouseEnterEvent, onMouseLeaveEvent} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment";
import type {Hospitalisation} from "../model/hospitalisationService.ts";

export default function HospItem({ hosp, index }: { hosp: Hospitalisation, index: number }) {
  
  const { id } = hosp
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <Link to={`/app/hospitalisations/${id}`}>
            {hosp.fkConsultation.fkPatient?.fullName?.toUpperCase() ?? hosp.fkConsultation.fkPatient.nom}
          </Link>
        </td>
        
        <td>{hosp?.dateAdmission
          ? `du le ${moment(hosp.dateAdmission).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
        
        <td>{hosp?.dateSortie
          ? `au le ${moment(hosp.dateSortie).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
      </tr>
    </>
  )
  
}
