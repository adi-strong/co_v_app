import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {RendezVous} from "../model/rendezVousService.ts";
import RdvForm from "./RdvForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function RdvItem(props: {
  rdv: RendezVous
  setRdvs: Dispatch<SetStateAction<RendezVous[]>>
  index: number
}) {
  
  const {
    rdv,
    index,
    setRdvs,
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
        
        <td>{rdv?.releasedAt ? moment(rdv.releasedAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(rdv, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={rdv}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>rendez-vous : {rdv.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un rendez-vous'
        onRefresh={() => { }}
        children={<RdvForm data={rdv}/> as ReactNode}
      />
    </>
  )
  
}
