import {Link} from "react-router-dom";
import moment from "moment";
import type {SortieProduit} from "../model/sortieProduitService.ts";

export default function SortieProdItem({ sortie }: { sortie: SortieProduit }) {
  
  const { id } = sortie
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/mouvements-stocks/${id}`}>
            {sortie.id}
          </Link>
        </td>
        
        <td>{sortie?.createdAt ? `du ${moment(sortie.createdAt).format('DD/MM/YY à HH:mm') }` : '—'}</td>
      </tr>
    </>
  )
  
}
