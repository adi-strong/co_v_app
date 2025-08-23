import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Fonction} from "../model/fonctionService.ts";
import FonctionForm from "./FonctionForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function FonctionItem(props: {
  fonction: Fonction
  setFonctions: Dispatch<SetStateAction<Fonction[]>>
  index: number
}) {
  
  const {
    fonction,
    index,
    setFonctions,
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
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(fonction, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={fonction}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>fonction : {fonction.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier la fonction'
        onRefresh={() => { }}
        children={<FonctionForm data={fonction}/> as ReactNode}
      />
    </>
  )
  
}
