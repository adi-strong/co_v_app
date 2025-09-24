import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../../compteCaisse/model/compteCaisse.slice.ts";
import {Link} from "react-router-dom";
import {
  formatDecimalNumberWithSpaces,
  formatNumberWithSpaces,
  getTotalFirstCurrencyAmount, getTotalLastCurrencyAmount
} from "../../../../services/services.ts";
import type {BonEntree} from "../model/bonEntreeService.ts";
import useGetBonEntreeAmount from "../model/useGetBonEntreeAmount.ts";

export default function BonEntreeItem(props: { entry: BonEntree }) {
  
  const { entry } = props
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  const {
    id,
    objet,
    slug,
    porteur,
    devise,
    taux,
    designationBonEntrees,
  } = entry
  
  const totalAmount = useGetBonEntreeAmount(designationBonEntrees)
  
  return (
    <>
      <tr>
        <td className='text-uppercase'><Link to={`/app/bons-des-entrees/${id}/${slug}`}>{objet}</Link></td>
        <td className='text-uppercase'>{porteur}</td>
        <td className='text-uppercase'>{formatDecimalNumberWithSpaces(Number(taux))}</td>
        
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
