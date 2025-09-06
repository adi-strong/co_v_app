import {Link} from "react-router-dom";
import moment from "moment/moment";
import type {Appro} from "../model/approService.ts";
import {
  formatDecimalNumberWithSpaces,
  formatNumberWithSpaces,
  getTotalFirstCurrencyAmount,
  getTotalLastCurrencyAmount
} from "../../../../services/services.ts";
import useSetApproTaxesData from "../hooks/useSetApproTaxesData.ts";
import useGetApproTotalAmount from "../hooks/useGetApproTotalAmount.ts";
import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../../../finances/compteCaisse/model/compteCaisse.slice.ts";
import {getApproSubTotal, getApproSubTotalWithDiscount, getApproTaxTotal} from "../model/approService.ts";
import {useState} from "react";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";

export default function ApproItem({ appro }: { appro: Appro }) {
  
  const { id, devise, taux, createdAt } = appro
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  const [taxes, setTaxes] = useState<BaseTaxeInt[]>([])
  
  useSetApproTaxesData(appro.approProduits, setTaxes)
  
  const subTotal: number = getApproSubTotal(appro.approProduits)
  const subTotalWithDiscount: number = getApproSubTotalWithDiscount(subTotal, Number(appro.remise))
  const taxesAmount: number = getApproTaxTotal(taxes)
  const totalAmount = useGetApproTotalAmount(subTotalWithDiscount, taxesAmount)
  
  return (
    <>
      <tr>
        <td>{formatNumberWithSpaces(id)}</td>
        
        <td className='fw-bold'>
          {compte
            && formatNumberWithSpaces(
              (getTotalFirstCurrencyAmount(compte.first.code, devise, Number(taux), totalAmount())).toFixed(2)
            )}
        </td>
        
        <td className='fw-bold'>
          {compte
            && formatNumberWithSpaces(
              (getTotalLastCurrencyAmount(compte.last.code, devise, Number(taux), totalAmount())).toFixed(2)
            )}
        </td>
        
        <td>{formatDecimalNumberWithSpaces(taux)}</td>
        <td>{formatDecimalNumberWithSpaces(taxesAmount.toFixed(2))} ({devise})</td>
        <td>{createdAt ? `du ${moment(createdAt).format('DD/MM/YY à HH:mm')}` : '—'}</td>
        
        <td className='text-md-end'>
          <Link to={`/app/approvisionnements/${id}`}>
            <i className='bi bi-eye-fill'/>
          </Link>
        </td>
      </tr>
    </>
  )
  
}
