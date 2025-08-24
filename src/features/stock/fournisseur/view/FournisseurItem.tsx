import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment/moment";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import type {Fournisseur} from "../model/fournisseurService.ts";
import FournisseurForm from "./FournisseurForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function FournisseurItem(props: {
  fournisseur: Fournisseur
  setFournisseurs: Dispatch<SetStateAction<Fournisseur[]>>
  index: number
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
}) {
  
  const {
    fournisseur,
    index,
    setFournisseurs,
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
            value={fournisseur.selected}
            checked={fournisseur.selected}
            onChange={(): void => setSelectedDataItem(index, setFournisseurs)}
            className='me-0'
          />
          <Link to={`/app/fournisseurs/${fournisseur.id}/${fournisseur?.slug}`}>
            {fournisseur.nomCommercial}
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
        
        <td>{fournisseur?.focal?.toUpperCase() ?? '—'}</td>
        <td>{fournisseur.tel}</td>
        <td>{fournisseur?.email?.toLowerCase() ?? '—'}</td>
        <td>{fournisseur?.createdAt ? moment(fournisseur.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(fournisseur, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={fournisseur}
        show={isDel}
        onRefresh={(): void => { }}
        title={<><br/> fournisseur : {fournisseur.nomCommercial.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un fournisseur'
        icon='pencil-square'
        onRefresh={() => { }}
        children={<FournisseurForm data={fournisseur} /> as ReactNode}
      />
    </>
  )
  
}
