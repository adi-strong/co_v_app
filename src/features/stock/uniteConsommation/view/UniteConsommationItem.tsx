import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import UniteConsommationForm from "./UniteConsommationForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function UniteConsommationItem(props: {
  unite: UniteConsommation
  setUnites: Dispatch<SetStateAction<UniteConsommation[]>>
  index: number
}) {
  
  const {
    unite,
    index,
    setUnites,
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
            value={unite.selected}
            checked={unite.selected}
            onChange={(): void => setSelectedDataItem(index, setUnites)}
            className='me-0'
          />
          <Link to={`/app/unites-consommations/${unite.id}/${unite?.slug}`}>
            {unite.nom.toUpperCase()}
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
        
        <td>{unite?.createdAt ? moment(unite.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(unite, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={unite}
        show={isDel}
        onRefresh={(): void => { }}
        title={<><br/> unité de consommation : {unite.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title="Modifier l'unité"
        onRefresh={() => { }}
        children={<UniteConsommationForm data={unite}/> as ReactNode}
      />
    </>
  )
  
}
