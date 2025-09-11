import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import DocumentForm from "./DocumentForm.tsx";
import {memo} from "react";
import {useGetUniqueDocumentSuiviQuery} from "../model/documentSuivi.api.slice.ts";
import {useParams} from "react-router-dom";

const EditDocument = () => {
  
  useDocumentTitle('Modifier la fiche de suivi du patient')
  useActivePage('treats')
  
  const { id } = useParams()
  const { data, isFetching, refetch } = useGetUniqueDocumentSuiviQuery(id)
  
  return (
    <BodyContainer>
      <PageTitles title='Modifier la fiche de suivi du patient'/>
      <DocumentForm data={data} loader={isFetching} handleRefresh={async (): Promise<void> => { await refetch() }}/>
    </BodyContainer>
  )
  
}

export default memo(EditDocument)
