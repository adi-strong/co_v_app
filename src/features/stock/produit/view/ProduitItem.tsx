import type {Produit} from "../model/produitService.ts";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {
  formatNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import avatar from '../../../../assets/images/placeholder/placeholder-4by3.svg';
import {Button, Image} from "react-bootstrap";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import RemoveProductModal from "./RemoveProductModal.tsx";
import moment from "moment";
import {quantityAlertColor} from "../model/produitService.ts";
import ProduitForm from "./ProduitForm.tsx";

export default function ProduitItem({ index, product, onRefresh, setProducts }: {
  product: Produit
  setProducts: Dispatch<SetStateAction<Produit[]>>
  index: number
  onRefresh: () => void
}) {
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  const {
    id,
    nom,
    slug,
    image,
    selected,
    code,
    fkUnite,
    createdAt,
    quantity,
  } = product
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize align-middle'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <div className='d-flex align-items-center'>
            <CheckField
              inline
              name='selected'
              value={selected}
              checked={selected}
              onChange={(): void => setSelectedDataItem(index, setProducts)}
              className='me-0'
            />
            
            <div className='icon-shape icon-md border p-4 rounded-1'>
              <Image
                src={(image ? APP_ENTRYPOINT + image.contentUrl : avatar) as string}
                width={24}
                height={23}
                alt=''
              />
            </div>
            
            <div className='ms-3 lh-1'>
              <h5 className='mb-1'>
                <Link to={`/app/produits/${id}/${slug}`} className='text-inherit'>
                  {nom.toUpperCase()}
                </Link>
              </h5>
            </div>
          </div>
          
          <div id={`actions-${index}`} className='mt-2' hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td className='align-middle fwb'>{code}</td>
        <td className={`align-middle fwb fw-bold text-${quantityAlertColor(quantity)}`}>
          {Number(quantity) < 42 && <i className='bi bi-exclamation-circle-fill me-1' />}
          {formatNumberWithSpaces(quantity.toFixed(1))}
        </td>
        
        <td className='align-middle fw-bold'>{fkUnite ? fkUnite.nom : '—'}</td>
        <td className='align-middle'>
          {createdAt ? `le ${moment(createdAt).format('DD/MM/YY à HH:mm')}` : '—'}
        </td>
      </tr>
      
      <RemoveProductModal
        onHide={(): void => handleShow(setIsDel)}
        data={product}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un produit'
        icon='pencil-square'
        children={(
          <ProduitForm
            onHide={(): void => handleShow(setIsEdit)}
            onRefresh={onRefresh}
            data={product}
          />
        ) as ReactNode}
      />
    </>
  )
  
}
