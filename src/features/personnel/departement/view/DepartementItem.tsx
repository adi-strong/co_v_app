import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Departement} from "../model/departementService.ts";
import DepartementForm from "./DepartementForm.tsx";
import RemoveDepartmentModal from "./RemoveDepartmentModal.tsx";

export default function DepartementItem(props: {
  departement: Departement
  setDepartements: Dispatch<SetStateAction<Departement[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    departement,
    index,
    setDepartements,
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
            value={departement.selected}
            checked={departement.selected}
            onChange={(): void => setSelectedDataItem(index, setDepartements)}
            className='me-0'
          />
          <Link to={`/app/departements/${departement.id}/${departement?.slug}`}>
            {departement.nom.toUpperCase()}
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
        
        <td>{departement?.createdAt ? moment(departement.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveDepartmentModal
        onHide={(): void => handleShow(setIsDel)}
        data={departement}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier le département'
        icon='pencil-square'
        children={
          <DepartementForm
            data={departement}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
