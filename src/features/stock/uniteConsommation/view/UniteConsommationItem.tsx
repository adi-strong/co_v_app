import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import UniteConsommationForm from "./UniteConsommationForm.tsx";
import RemoveUniteConsommationModal from "./RemoveUniteConsommationModal.tsx";

export default function UniteConsommationItem(props: {
  unite: UniteConsommation
  setUnites: Dispatch<SetStateAction<UniteConsommation[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    unite,
    index,
    setUnites,
    onRefresh,
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
      
      <RemoveUniteConsommationModal
        onHide={(): void => handleShow(setIsDel)}
        data={unite}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title="Modifier l'unité"
        icon='pencil-square'
        children={
          <UniteConsommationForm
            data={unite}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
