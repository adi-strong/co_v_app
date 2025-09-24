import {memo, useState} from 'react';
import {Card} from "react-bootstrap";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {useGetBonDepensesQuery} from "../model/bonDeDepenses.api.slice.ts";
import type {BonDeDepense} from "../model/bonDeDepensesService.ts";
import useGetExpensesItems from "../hooks/useGetExpensesItems.ts";
import BonDeDepensesList from "./BonDeDepensesList.tsx";

const BonDeDepensesView = () => {
  
  useDocumentTitle('Bons de dépenses')
  useActivePage('finances')
  
  const { data, isLoading, isFetching, refetch } = useGetBonDepensesQuery('LIST')
  
  const [expenses, setExpenses] = useState<BonDeDepense[]>([])
  
  useGetExpensesItems(data, setExpenses)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Bons de dépenses' />
      <Card>
        <BonDeDepensesList
          onRefresh={onRefresh}
          loader={isLoading}
          isFetching={isFetching}
          expenses={expenses}
        />
      </Card>
    </BodyContainer>
  );
  
};

export default memo(BonDeDepensesView);
