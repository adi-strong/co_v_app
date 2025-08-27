import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField, RemoveModal} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment/moment";
import type {LotProduit} from "../model/lotProduitService.ts";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function ProduitItem(props: {
  produit: LotProduit
  setProduits: Dispatch<SetStateAction<LotProduit[]>>
  index: number
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
}) {
  
  const {
    produit,
    index,
    setProduits,
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
            value={produit.selected}
            checked={produit.selected}
            onChange={(): void => setSelectedDataItem(index, setProduits)}
            className='me-0'
          />
          <Link to={`/app/produits/${produit.id}/${produit.fkProduit?.slug}`}>
            {produit.fkProduit.nom.toUpperCase()}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Link to={`/app/produits/${produit.id}/${produit.fkProduit?.slug}/edit`} className='p-0 btn btn-sm btn-link'>
              Modifier
            </Link>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>{produit?.datePeremption
          ? `expire le ${moment(produit.datePeremption).format('DD/MM/YY à HH:mm') }`
          : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(produit, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={produit}
        show={isDel}
        onRefresh={(): void => { }}
        title={<><br/> produit : {produit.fkProduit.nom.toUpperCase()}</>}
      />
    </>
  )
  
}
