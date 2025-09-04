import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../services/services.ts";
import {CheckField, SideContent} from "../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {RendezVous} from "../model/rendezVousService.ts";
import RdvForm from "./RdvForm.tsx";
import RemoveRdvModal from "./RemoveRdvModal.tsx";

export default function RdvItem(props: {
  rdv: RendezVous
  setRdvs: Dispatch<SetStateAction<RendezVous[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    rdv,
    index,
    setRdvs,
    onRefresh
  } = props
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <CheckField
            inline
            name='selected'
            value={rdv.selected}
            checked={rdv.selected}
            onChange={(): void => setSelectedDataItem(index, setRdvs)}
            className='me-0'
          />
          <Link to={`/app/services/${rdv.id}/${rdv?.slug}`}>
            {rdv.nom.toUpperCase()}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td className='text-uppercase'>{rdv.objet}</td>
        <td>{rdv.tel}</td>
        <td>{rdv?.date ? moment(rdv.date).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveRdvModal
        onHide={(): void => handleShow(setIsDel)}
        data={rdv}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un rendez-vous'
        icon='pencil-square'
        children={<RdvForm data={rdv} onRefresh={onRefresh} onHide={(): void => handleShow(setIsEdit)}/> as ReactNode}
      />
    </>
  )
  
}
