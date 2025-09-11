import {useParams} from "react-router-dom";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {useGetUniqueConsultationQuery} from "../model/consultation.api.slice.ts";
import {BodyContainer, PageTitles} from "../../../../components";
import ConsultForm from "./ConsultForm.tsx";
import {memo} from "react";

const EditConsultation = () => {
  
  const { id } = useParams()
  
  useDocumentTitle(`Fiche de consultation n°${id}`)
  useActivePage('treats')
  
  const { data, isFetching, refetch } = useGetUniqueConsultationQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title={`Modifier une fiche`}/>
      <ConsultForm onRefresh={onRefresh} data={data} loader={isFetching} />
    </BodyContainer>
  )
  
}

export default memo(EditConsultation)
