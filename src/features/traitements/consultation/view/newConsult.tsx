import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import ConsultForm from "./ConsultForm.tsx";
import {useGetConsultationsQuery} from "../model/consultation.api.slice.ts";

const NewConsult = () => {
  
  useDocumentTitle('Nouvelle fiche de consultation')
  useActivePage('treats')
  
  const { refetch } = useGetConsultationsQuery('LIST')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouvelle fiche de consultation'/>
      <ConsultForm onRefresh={async (): Promise<void> => { await refetch() }} />
    </BodyContainer>
  )
  
}

export default memo(NewConsult)
