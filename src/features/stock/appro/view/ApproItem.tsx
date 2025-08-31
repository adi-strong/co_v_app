import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {Appro} from "../model/approService.ts";

export default function ApproItem({ appro }: { appro: Appro }) {
  
  const { id } = appro
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/approvisionnements/${id}`}>
            {appro.id}
          </Link>
        </td>
        
        <td>{appro?.createdAt ? `du ${moment(appro.createdAt).format('DD/MM/YY à HH:mm') }` : '—'}</td>
      </tr>
    </>
  )
  
}
