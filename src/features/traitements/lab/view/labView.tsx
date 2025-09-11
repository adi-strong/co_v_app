import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import LabList from "./LabList.tsx";
import {useGetLabsQuery} from "../model/lab.api.slice.ts";
import type {Lab} from "../model/labService.ts";
import useSetLabItems from "../hooks/useSetLabItems.tsx";

const LabView = () => {
  
  useDocumentTitle('Laboratoire')
  useActivePage('treats')
  
  const { data, isLoading, isFetching, refetch } = useGetLabsQuery('LIST')
  
  const [labs, setLabs] = useState<Lab[]>([])
  
  useSetLabItems(data, setLabs)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title="Liste des documents d'analyses au labo"/>
      <Card>
        <LabList
          labs={labs}
          loader={isLoading}
          isFetching={isFetching}
          onRefresh={onRefresh}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(LabView)
