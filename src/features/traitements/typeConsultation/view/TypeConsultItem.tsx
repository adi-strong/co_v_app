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
import moment from "moment";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import TypeConsultForm from "./TypeConsultForm.tsx";
import RemoveTypeConsultModal from "./RemoveTypeConsultModal.tsx";

export default function TypeConsultItem(props: {
  typeConsult: TypeConsultation
  setTypesConsults: Dispatch<SetStateAction<TypeConsultation[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    typeConsult,
    index,
    setTypesConsults,
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
            value={typeConsult.selected}
            checked={typeConsult.selected}
            onChange={(): void => setSelectedDataItem(index, setTypesConsults)}
            className='me-0'
          />
          {typeConsult.nom.toUpperCase()}
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>{typeConsult?.taxe ? formatDecimalNumberWithSpaces(typeConsult.taxe) : '—'}</td>
        <td>{formatDecimalNumberWithSpaces(typeConsult.prixHt)}</td>
        <td>{formatDecimalNumberWithSpaces(typeConsult.prixTtc)}</td>
        <td>{typeConsult?.createdAt ? moment(typeConsult.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveTypeConsultModal
        onHide={(): void => handleShow(setIsDel)}
        data={typeConsult}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier le type de fiches'
        children={
          <TypeConsultForm
            data={typeConsult}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
