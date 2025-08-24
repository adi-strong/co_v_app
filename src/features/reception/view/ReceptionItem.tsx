import {Link} from "react-router-dom";
import moment from "moment";
import type {Reception} from "../model/receptionService.ts";

export default function ReceptionItem({ reception }: { reception: Reception }) {
  
  return (
    <>
      <tr>
        <td>
          <Link to={`/app/receptions/${reception.id}/${reception?.slug}`}>
            {reception.nomComplet.toUpperCase()}
          </Link>
        </td>
        <td>{reception.motif}</td>
        <td>{reception.tel}</td>
        <td className='fst-italic'>
          {reception?.createdAt
            ? (<>enregistré <i className='text-capitalize'>{moment(reception.createdAt).format('dddd, D MMMM YYYY')}</i></>)
            : '—'}
        </td>
      </tr>
    </>
  )
  
}
