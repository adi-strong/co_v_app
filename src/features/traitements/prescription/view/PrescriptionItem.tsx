import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, RemoveModal} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import type {Prescription} from "../model/prescriptionService.ts";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function PrescriptionItem(props: {
  prescription: Prescription
  setPrescription: Dispatch<SetStateAction<Prescription[]>>
  index: number
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
}) {
  
  const {
    prescription,
    index,
    setPrescription,
  } = props
  
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
            value={prescription.selected}
            checked={prescription.selected}
            onChange={(): void => setSelectedDataItem(index, setPrescription)}
            className='me-0'
          />
          <Link to={`/app/prescriptions/${prescription.id}`}>
            {prescription.id}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(prescription, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={prescription}
        show={isDel}
        onRefresh={(): void => { }}
        title='Ordonnance'
      />
    </>
  )
  
}
