import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Fonction} from "../model/fonctionService.ts";
import FonctionForm from "./FonctionForm.tsx";
import RemoveFonctionModal from "./RemoveFonctionModal.tsx";

export default function FonctionItem(props: {
  fonction: Fonction
  setFonctions: Dispatch<SetStateAction<Fonction[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    fonction,
    index,
    setFonctions,
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
            value={fonction.selected}
            checked={fonction.selected}
            onChange={(): void => setSelectedDataItem(index, setFonctions)}
            className='me-0'
          />
          <Link to={`/app/fonctions/${fonction.id}/${fonction?.slug}`}>
            {fonction.nom.toUpperCase()}
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
        
        <td>{fonction?.createdAt ? moment(fonction.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveFonctionModal
        onHide={(): void => handleShow(setIsDel)}
        data={fonction}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier la fonction'
        icon='pencil-square'
        children={
          <FonctionForm
            data={fonction}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
