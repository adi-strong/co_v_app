import type {ApproProdut} from "../model/approService.ts";
import {formatDecimalNumberWithSpaces, formatNumberWithSpaces} from "../../../../services/services.ts";

export default function ShowApproItem({ product }: { product: ApproProdut }) {
  
  const {
    tva,
    fkUnite,
    unite,
    prixHt,
    price,
    qty,
    quantite,
  } = product
  
  const { nom } = product.fkProduit
  const unitPrice = price && Number(price) > 0.00 ? Number(price) : Number(prixHt)
  const quantity = qty && Number(qty) > 0.00 ? Number(qty) : Number(quantite)
  
  return (
    <tr>
      <td className='text-uppercase'>{nom}</td>
      <td>{formatNumberWithSpaces(quantity)}</td>
      <td className='text-lowercase'>{unite ? unite : fkUnite && fkUnite.nom}</td>
      <td>{formatDecimalNumberWithSpaces(unitPrice)}</td>
      <td>{tva ? Number(tva).toFixed(1) : '—'}</td>
      <td>{formatDecimalNumberWithSpaces((unitPrice * quantity))}</td>
    </tr>
  )
  
}
