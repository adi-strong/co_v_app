import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import TypeConsultForm from "./TypeConsultForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function TypeConsultItem(props: {
  typeConsult: TypeConsultation
  setTypesConsults: Dispatch<SetStateAction<TypeConsultation[]>>
  index: number
}) {
  
  const {
    typeConsult,
    index,
    setTypesConsults,
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
          <Link to={`/app/types-documents-suivis/${typeConsult.id}/${typeConsult?.slug}`}>
            {typeConsult.nom.toUpperCase()}
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
        
        <td>{typeConsult?.createdAt ? moment(typeConsult.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(typeConsult, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={typeConsult}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>Type de fiches : {typeConsult.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier le type de fiches'
        onRefresh={() => { }}
        children={<TypeConsultForm data={typeConsult}/> as ReactNode}
      />
    </>
  )
  
}
