import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {PerteProduit} from "../model/perteProduitService.ts";

export default function PerteProdItem({ perte }: { perte: PerteProduit }) {
  
  const { id } = perte
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/mouvements-stocks/${id}`}>
            {perte.id}
          </Link>
        </td>
        
        <td>{perte?.releasedAt ? `du ${moment(perte.releasedAt).format('DD/MM/YY à HH:mm') }` : '—'}</td>
      </tr>
    </>
  )
  
}
