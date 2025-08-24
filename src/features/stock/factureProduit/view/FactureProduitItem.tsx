import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent} from "../../../../services/services.ts";
import {RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {FactureProduit} from "../model/factureProduitService.ts";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function FactureProduitItem(props: {
  facture: FactureProduit
  setFactures: Dispatch<SetStateAction<FactureProduit[]>>
  index: number
}) {
  
  const {
    facture,
    index,
    // setFactures,
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
          <Link to={`/app/factures-produits/${facture.id}`}>
            {facture.id}
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
        
        <td>{facture?.nomClient ? facture.nomClient.toUpperCase() : '—'}</td>
        <td>{facture?.createdAt ? moment(facture.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(facture, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={facture}
        show={isDel}
        onRefresh={(): void => { }}
        title='facture'
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier le service'
        onRefresh={() => { }}
        children={<div/> as ReactNode}
      />
    </>
  )
  
}
