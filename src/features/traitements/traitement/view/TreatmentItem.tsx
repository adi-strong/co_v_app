import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {
  formatDecimalNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Button} from "react-bootstrap";
import type {Traitement} from "../model/traitementService.ts";
import RemoveTraitementModal from "./RemoveTraitementModal.tsx";
import TraitementForm from "./TraitementForm.tsx";

export default function TreatmentItem(props: {
  traitement: Traitement
  setTraitements: Dispatch<SetStateAction<Traitement[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    traitement,
    index,
    setTraitements,
    onRefresh,
  } = props
  
  const { nom, prixHt, prixTtc} = traitement
  
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
            value={traitement.selected}
            checked={traitement.selected}
            onChange={(): void => setSelectedDataItem(index, setTraitements)}
            className='me-0'
          />
          {traitement.nom.toUpperCase()}
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>{prixHt && Number(prixHt) > 0 ? formatDecimalNumberWithSpaces(prixHt) : '—'}</td>
        <td>{prixTtc && Number(prixTtc) > 0 ? formatDecimalNumberWithSpaces(prixTtc) : '—'}</td>
      </tr>
      
      <RemoveTraitementModal
        onHide={(): void => handleShow(setIsDel)}
        data={traitement}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un traitement'
        icon='pencil-square'
        children={
          <TraitementForm
            data={traitement}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
