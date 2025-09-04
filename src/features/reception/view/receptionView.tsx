import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles} from "../../../components";
import {Card} from "react-bootstrap";
import ReceptionList from "./ReceptionList.tsx";
import {useGetReceptionsQuery} from "../model/reception.api.slice.ts";
import type {Reception} from "../model/receptionService.ts";
import useGetReceptionsItems from "../hooks/useGetReceptionsItems.ts";

const ReceptionView = () => {
  
  useDocumentTitle('Réception')
  useActivePage('home')
  
  const { data, isLoading, isFetching, refetch } = useGetReceptionsQuery('LIST')
  
  const [receptions, setReceptions] = useState<Reception[]>([])
  
  useGetReceptionsItems(data, setReceptions)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Réception' />
      
      <Card>
        <ReceptionList
          receptions={receptions}
          isFetching={isFetching}
          onRefresh={onRefresh}
          loader={isLoading}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ReceptionView)
