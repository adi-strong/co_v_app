import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {useGetBonEntreesQuery} from "../model/bonEntree.api.slice.ts";
import type {BonEntree} from "../model/bonEntreeService.ts";
import useGetBonEntreeItems from "../hooks/useGetBonEntreeItems.ts";
import {Card} from "react-bootstrap";
import BonEntreeList from "./BonEntreeList.tsx";

const BonEntreeView = () => {
  
  useDocumentTitle('Bons des entrées')
  useActivePage('finances')
  
  const { data, isLoading, isFetching, refetch } = useGetBonEntreesQuery('LIST')
  
  const [entries, setEntries] = useState<BonEntree[]>([])
  
  useGetBonEntreeItems(data, setEntries)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Bons des entrées'/>
      <Card>
        <BonEntreeList
          onRefresh={onRefresh}
          loader={isLoading}
          isFetching={isFetching}
          entries={entries}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(BonEntreeView)
