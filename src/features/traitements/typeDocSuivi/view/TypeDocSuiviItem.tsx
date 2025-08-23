import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment/moment";
import type {TypeDocSuivi} from "../model/typeDocSuiviService.ts";
import TypeDocSuiviForm from "./TypeDocSuiviForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function TypeDocSuiviItem(props: {
  typeDocSuivi: TypeDocSuivi
  setTypesDocsSuivi: Dispatch<SetStateAction<TypeDocSuivi[]>>
  index: number
}) {
  
  const {
    typeDocSuivi,
    index,
    setTypesDocsSuivi,
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
            value={typeDocSuivi.selected}
            checked={typeDocSuivi.selected}
            onChange={(): void => setSelectedDataItem(index, setTypesDocsSuivi)}
            className='me-0'
          />
          <Link to={`/app/types-documents-suivis/${typeDocSuivi.id}/${typeDocSuivi?.slug}`}>
            {typeDocSuivi.nom.toUpperCase()}
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
        
        <td>{typeDocSuivi?.createdAt ? moment(typeDocSuivi.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(typeDocSuivi, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={typeDocSuivi}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>Type de document : {typeDocSuivi.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier le type de document'
        onRefresh={() => { }}
        children={<TypeDocSuiviForm data={typeDocSuivi}/> as ReactNode}
      />
    </>
  )
  
}
