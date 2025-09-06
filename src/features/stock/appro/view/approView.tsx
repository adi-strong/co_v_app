import {memo, useState} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Card} from "react-bootstrap";
import ApproList from "./ApproList.tsx";
import {useGetApprosQuery} from "../model/appro.api.slice.ts";
import type {Appro} from "../model/approService.ts";
import useGetApproItems from "../hooks/useGetApproItems.ts";

const ApproView = () => {
  
  useDocumentTitle('Approvisionnements')
  useActivePage('pharmacy')
  
  const { data, isLoading, isFetching, refetch } = useGetApprosQuery('LIST')
  
  const [appros, setAppros] = useState<Appro[]>([])
  
  useGetApproItems(data, setAppros)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Approvisionnements'/>
      <Card>
        <ApproList
          appros={appros}
          loader={isLoading}
          onRefresh={onRefresh}
          isFetching={isFetching}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ApproView)
