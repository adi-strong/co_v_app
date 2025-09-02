import moment from "moment";
import type {Reception} from "../model/receptionService.ts";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent} from "../../../services/services.ts";
import {Button} from "react-bootstrap";
import {ReactNode, useState} from "react";
import {SideContent} from "../../../components";
import ShowReception from "./ShowReception.tsx";

export default function ReceptionItem({ reception, index }: { reception: Reception; index: number }) {
  
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <>
      <tr
        id={`item-${index}`}
        className='text-capitalize'
        onMouseEnter={(): void => onMouseEnterEvent(index)}
        onMouseLeave={(): void => onMouseLeaveEvent(index)}
      >
        <td>
          {reception.nomComplet.toUpperCase()}
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setShow)}>
              Voir plus
            </Button>
          </div>
        </td>
        
        <td>{reception.motif}</td>
        <td>{reception.tel}</td>
        <td className='fst-italic'>
          {reception?.createdAt
            ? (<>enregistré <i
              className='text-capitalize'>{moment(reception.createdAt).format('dddd, D MMMM YYYY')}</i></>)
            : '—'}
        </td>
      </tr>
      
      <SideContent
        show={show}
        onHide={(): void => handleShow(setShow)}
        title={`Fiche de réception du ${reception?.createdAt && moment(reception.createdAt).format('DD/MM/YY')}`}
        children={(<ShowReception reception={reception} />) as ReactNode}
      />
    </>
  )
  
}
