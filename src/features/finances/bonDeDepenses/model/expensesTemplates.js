import {totalExpenseAmount} from "./bonDeDepensesService";
import moment from "moment/moment";
import 'moment/locale/fr';
import {Link} from "react-router-dom";
import {onSubStr} from "../../../services";
import {Badge} from "react-bootstrap";

export const expenseTitleBody = (expense) => (
  <Link to={`/app/bons-de-depenses/${expense.id}/${expense?.slug}`} className='text-dark' title={expense.objet.toUpperCase()}>
    {onSubStr(55, expense.objet.toUpperCase())}
  </Link>
)

export const expenseDemandeur = (expense) => {
  return expense?.demandeur?.toUpperCase() ?? '-'
}

export const expenseSubTotal = (order) => {
  const designationBonDeDepenses = order?.designationBonDeDepenses?.length > 0
    ? order.designationBonDeDepenses
    : []
  
  return <b>$ {totalExpenseAmount(designationBonDeDepenses)}</b>
}

export const expenseSubTotal2 = (order) => {
  const designationBonDeDepenses = order?.designationBonDeDepenses?.length > 0
    ? order.designationBonDeDepenses
    : []
  
  return `$ ${totalExpenseAmount(designationBonDeDepenses)}`
}

export const expenseCreatedAt = (expense) => expense?.createdAt
  ? moment(expense.createdAt).calendar()
  : '-'

export const expenseCategories = (expense) => {
  const uniqueTypes = Array.from(
    new Set(
      expense.designationBonDeDepenses
        .map(d => d?.fkTypeDepense?.nom)
        .filter(Boolean)
    )
  )
  
  return uniqueTypes.length > 0 ? uniqueTypes.map((nom, i) => (
    <Badge key={i} className='me-1 text-uppercase'>
      {nom}
    </Badge>
  )) : '---'
}
