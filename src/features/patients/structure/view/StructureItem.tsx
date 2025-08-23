import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Structure} from "../model/structureService.ts";
import StructureForm from "./StructureForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function StructureItem(props: {
  structure: Structure
  setStructures: Dispatch<SetStateAction<Structure[]>>
  index: number
}) {
  
  const {
    structure,
    index,
    setStructures,
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
            value={structure.selected}
            checked={structure.selected}
            onChange={(): void => setSelectedDataItem(index, setStructures)}
            className='me-0'
          />
          <Link to={`/app/structures/${structure.id}/${structure?.slug}`}>
            {structure.nom.toUpperCase()}
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
        
        <td>{structure?.focal?.toUpperCase() ?? '—'}</td>
        <td>{structure.tel}</td>
        <td>{structure?.email?.toLowerCase() ?? '—'}</td>
        <td>{structure?.createdAt ? moment(structure.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(structure, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={structure}
        show={isDel}
        onRefresh={(): void => { }}
        title={<><br/> structure : {structure.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier une structure'
        onRefresh={() => { }}
        children={<StructureForm data={structure}/> as ReactNode}
      />
    </>
  )
  
}
