import moment from "moment";
import type {Reception} from "../model/receptionService.ts";
import {handleShow} from "../../../services/services.ts";
import {ReactNode, useState} from "react";
import {SideContent} from "../../../components";
import ShowReception from "./ShowReception.tsx";
import {Button} from "react-bootstrap";

export default function ReceptionItem({ reception, index }: { reception: Reception; index: number }) {
  
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <>
      <tr>
        <td>{reception.nomComplet.toUpperCase()}</td>
        
        <td>{reception.motif}</td>
        <td>{reception.tel}</td>
        <td className='fst-italic'>
          {reception?.createdAt
            ? (<>enregistré <i
              className='text-capitalize'>{moment(reception.createdAt).format('dddd, D MMMM YYYY')}</i></>)
            : '—'}
        </td>
        
        <td className='text-md-end'>
          <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setShow)}>
            Voir plus
          </Button>
        </td>
      </tr>
      
      <SideContent
        show={show}
        onHide={(): void => handleShow(setShow)}
        icon='eye-fill'
        title={`Fiche de réception du ${reception?.createdAt && moment(reception.createdAt).format('DD/MM/YY')}`}
        children={(<ShowReception reception={reception} />) as ReactNode}
      />
    </>
  )
  
}
