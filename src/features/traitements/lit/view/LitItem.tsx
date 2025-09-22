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
import {Badge, Button} from "react-bootstrap";
import type {Lit} from "../model/litService.ts";
import LitForm from "./LitForm.tsx";
import RemoveLitModal from "./RemoveLitModal.tsx";
import {litStatusColor, litStatusLabel} from "../model/litService.ts";

export default function LitItem(props: {
  lit: Lit
  setLits: Dispatch<SetStateAction<Lit[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    lit,
    index,
    setLits,
    onRefresh,
  } = props
  
  const { estCeOccuppe } = lit
  
  const status = estCeOccuppe ? 'busy' : 'free'
  
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
          {/* <Link to={`/app/lits/${lit.id}/${lit?.slug}`}>
            {lit.numero.toUpperCase()}
          </Link> */}
          
          {lit.numero.toUpperCase()}
          
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
        
        <td>
          <Badge bg={litStatusColor[status]}>
            {litStatusLabel[status]}
          </Badge>
        </td>
      </tr>
      
      <RemoveLitModal
        onHide={(): void => handleShow(setIsDel)}
        data={lit}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title="Modifier un lit d'hospitalisation"
        icon='pencil-square'
        onRefresh={onRefresh}
        children={
          <LitForm
            data={lit}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
  
}
