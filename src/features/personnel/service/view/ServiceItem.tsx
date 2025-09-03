import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment/moment";
import type {Service} from "../model/serviceService.ts";
import ServiceForm from "./ServiceForm.tsx";
import RemoveServiceModal from "./RemoveServiceModal.tsx";

export default function ServiceItem(props: {
  service: Service
  setServices: Dispatch<SetStateAction<Service[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    service,
    index,
    setServices,
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
            value={service.selected}
            checked={service.selected}
            onChange={(): void => setSelectedDataItem(index, setServices)}
            className='me-0'
          />
          <Link to={`/app/services/${service.id}/${service?.slug}`}>
            {service.nom.toUpperCase()}
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
        
        <td>{service?.createdAt ? moment(service.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveServiceModal
        onHide={(): void => handleShow(setIsDel)}
        data={service}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier le service'
        icon='pencil-square'
        children={
          <ServiceForm
            data={service}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
