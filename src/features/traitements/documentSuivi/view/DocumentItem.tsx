import {onMouseEnterEvent, onMouseLeaveEvent} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment";
import type {DocumentSuivi} from "../model/documentSuiviService.ts";

export default function DocumentItem({ doc, index }: { doc: DocumentSuivi, index: number }) {
  
  const { id } = doc
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <Link to={`/app/suivis/${id}}`}>
            {doc?.fkPatient?.fullName ?? '—'}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Link to={`/app/suivis/${doc.id}/edit`} className='p-0 btn btn-sm btn-link'>
              Retoucher
            </Link>
          </div>
        </td>
        
        <td>{doc?.dateDebut
          ? `du le ${moment(doc.dateDebut).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
        
        <td>{doc?.dateFin
          ? `au le ${moment(doc.dateFin).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
      </tr>
    </>
  )
  
}
