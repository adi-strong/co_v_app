import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {
  formatNumberWithSpaces,
  handleShow, onMouseEnterEvent, onMouseLeaveEvent
} from "../../../../services/services.ts";
import {SideContent} from "../../../../components";
import {Button, Image} from "react-bootstrap";
import {APP_ENTRYPOINT} from "../../../../config/configs.ts";
import avatar from "../../../../assets/images/placeholder/placeholder-4by3.svg";
import {Link} from "react-router-dom";
import {quantityAlertColor} from "../../produit/model/produitService.ts";
import type {LotProduit} from "../model/lotProduitService.ts";
import moment from "moment";
import LotProdForm from "./LotProdForm.tsx";

export default function LotProdItem({ index, lotProd, onRefresh }: {
  lotProd: LotProduit
  index: number
  onRefresh: () => void
}) {
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  
  const {
    id,
    tva,
    fkUnite,
    prixHt,
    prixTtc,
    datePeremption,
    quantite,
    nom,
    image,
    fkProduit,
    devise,
  } = lotProd
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize align-middle'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
          style={{ fontSize: '0.8rem' }}
        >
          <div className='d-flex align-items-center'>
            <div className='icon-shape icon-md border p-4 rounded-1' style={{ fontSize: '0.8rem' }}>
              <Image
                src={(image ? APP_ENTRYPOINT + image.contentUrl : avatar) as string}
                width={24}
                height={23}
                alt=''
              />
            </div>
            
            <div className='ms-3 lh-1'>
              <h5 className='mb-1' style={{ fontSize: '0.7rem' }}>
                <Link to={`/app/produits/${id}/${fkProduit?.slug}`} className='text-inherit'>
                  {nom.toUpperCase()}
                </Link>
              </h5>
            </div>
          </div>
          
          <div id={`actions-${index}`} className='mt-2' hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-warning'>
              Jeter
            </Button>
          </div>
        </td>
        
        <td className={`align-middle fwb fw-bold text-${quantityAlertColor(quantite)}`} style={{ fontSize: '0.8rem' }}>
          {Number(quantite) < 42 && <i className='bi bi-exclamation-circle-fill me-1'/>}
          {formatNumberWithSpaces(quantite.toFixed(1))}
          <span className='fw-normal mx-1'>({fkUnite ? `${fkUnite.nom}` : '—'})</span>
        </td>
        
        <td className='align-middle fw-bold' style={{ fontSize: '0.8rem' }}>
          {formatNumberWithSpaces(Number(prixHt).toFixed(2))}
          <span className='fw-normal mx-1'>({devise})</span>
        </td>
        
        <td className='align-middle fw-bold' style={{ fontSize: '0.8rem' }}>
        {formatNumberWithSpaces(Number(prixTtc).toFixed(2))}
          <span className='fw-normal mx-1'>({devise})</span>
        </td>
        
        <td className='align-middle' style={{ fontSize: '0.8rem' }}>
          {formatNumberWithSpaces(Number(tva))}%
        </td>
        
        <td className='align-middle' style={{ fontSize: '0.8rem' }}>
          {datePeremption ? moment(datePeremption).calendar() : '—'}
        </td>
      </tr>
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title={lotProd.nom}
        icon='pencil-square'
        children={(
          <LotProdForm
            data={lotProd}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          />) as ReactNode
        }
      />
    </>
  )
  
}
