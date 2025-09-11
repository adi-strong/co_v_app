import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import DocumentList from "./DocumentList.tsx";
import {useGetDocumentSuivisQuery} from "../model/documentSuivi.api.slice.ts";
import type {DocumentSuivi} from "../model/documentSuiviService.ts";
import useSetDocSuiviItems from "../hooks/useSetDocSuiviItems.ts";

const DocumentSuiviView = () => {
  
  useDocumentTitle('Fiches de suivi')
  useActivePage('treats')
  
  const { data, isLoading, isFetching, refetch } = useGetDocumentSuivisQuery('LIST')
  
  const [docs, setDocs] = useState<DocumentSuivi[]>([])
  
  useSetDocSuiviItems(data, setDocs)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Fiches de suivi des patients'/>
      <Card>
        <DocumentList
          docs={docs}
          isFetching={isFetching}
          onRefresh={onRefresh}
          loader={isLoading}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(DocumentSuiviView)
