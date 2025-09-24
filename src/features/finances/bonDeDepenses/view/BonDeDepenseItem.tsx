import type {BonDeDepense} from "../model/bonDeDepensesService.ts";
import {Link} from "react-router-dom";
import {
  formatDecimalNumberWithSpaces,
  formatNumberWithSpaces,
  getTotalFirstCurrencyAmount,
  getTotalLastCurrencyAmount
} from "../../../../services/services.ts";
import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../../compteCaisse/model/compteCaisse.slice.ts";
import useGetExpenseAmount from "../hooks/useGetExpenseAmount.ts";

export default function BonDeDepenseItem(props: { expense: BonDeDepense }) {
  
  const { expense } = props
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  const {
    id,
    objet,
    slug,
    demandeur,
    devise,
    taux,
    designationBonDeDepenses,
  } = expense
  
  const totalAmount = useGetExpenseAmount(designationBonDeDepenses)
  
  return (
    <>
      <tr>
        <td className='text-uppercase'><Link to={`/app/bons-des-depenses/${id}/${slug}`}>{objet}</Link></td>
        <td className='text-uppercase'>{demandeur}</td>
        <td className='text-uppercase'>{formatDecimalNumberWithSpaces(taux)}</td>
        
        <td className='fw-bold'>
          {compte
            && formatNumberWithSpaces(
              (getTotalFirstCurrencyAmount(compte.first.code, devise, Number(taux), totalAmount())).toFixed(2)
            )} {compte && `(${compte.first.code})`}
        </td>
        
        <td className='fw-bold'>
          {compte
            && formatNumberWithSpaces(
              (getTotalLastCurrencyAmount(compte.last.code, devise, Number(taux), totalAmount())).toFixed(2)
            )} {compte && `(${compte.last.code})`}
        </td>
      </tr>
    </>
  )
  
}
