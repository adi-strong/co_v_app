import BonDeDepensesData from "./BonDeDepensesData.tsx";
import type {BonDeDepense} from "../model/bonDeDepensesService.ts";

export default function BonDeDepensesList({ expenses, onRefresh, isFetching, loader }: {
  expenses: BonDeDepense[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <BonDeDepensesData
        expenses={expenses}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
