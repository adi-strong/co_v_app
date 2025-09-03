import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import AgentForm from "./AgentForm.tsx";
import {useGetUniqueAgentQuery} from "../model/agent.api.slice.ts";
import {useParams} from "react-router-dom";

const EditAgent = () => {
  
  useDocumentTitle('Nouvel agents')
  useActivePage('agents')
  
  const { id } = useParams()
  const { data, isFetching, refetch } = useGetUniqueAgentQuery(id)
  
  return (
    <BodyContainer>
      <PageTitles title='Modifier un agent'/>
      <AgentForm data={data} loader={isFetching} uRefresh={async (): Promise<void> => { await refetch() }}/>
    </BodyContainer>
  )
  
}

export default memo(EditAgent)
