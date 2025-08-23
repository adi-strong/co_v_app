import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {
  formatDecimalNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Lit} from "../model/litService.ts";
import LitForm from "./LitForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function LitItem(props: {
  lit: Lit
  setLits: Dispatch<SetStateAction<Lit[]>>
  index: number
}) {
  
  const {
    lit,
    index,
    setLits,
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
            value={lit.selected}
            checked={lit.selected}
            onChange={(): void => setSelectedDataItem(index, setLits)}
            className='me-0'
          />
          <Link to={`/app/lits/${lit.id}/${lit?.slug}`}>
            {lit.numero.toUpperCase()}
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
        
        <td>{lit.mode === 'PAR_JOUR' ? 'Par jour' : 'Par heure'}</td>
        <td>{formatDecimalNumberWithSpaces(lit.prix)}</td>
        <td>{lit?.createdAt ? moment(lit.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(lit, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={lit}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>lit : {lit.numero.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title="Modifier un lit d'hospitalisation"
        onRefresh={() => { }}
        children={<LitForm data={lit}/> as ReactNode}
      />
    </>
  )
  
}
