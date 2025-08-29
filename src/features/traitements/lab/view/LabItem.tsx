import {onMouseEnterEvent, onMouseLeaveEvent} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {Lab} from "../model/labService.ts";

export default function LabItem({ lab, index }: { lab: Lab, index: number }) {
  
  const { id } = lab
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <Link to={`/app/labs/${id}}`}>
            {lab?.fkPatient?.fullName ?? '—'}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Link to={`/app/labs/${lab.id}/edit`} className='p-0 btn btn-sm btn-link'>
              Retoucher
            </Link>
          </div>
        </td>
        
        <td>{lab?.releasedAt ? `résultat du ${moment(lab.releasedAt).format('DD/MM/YY à HH:mm') }` : '—'}</td>
      </tr>
    </>
  )
  
}
