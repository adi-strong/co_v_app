import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import AgentForm from "./AgentForm.tsx";
import {getAgentFakeData} from "../model/agentService.ts";

const EditAgent = () => {
  
  useDocumentTitle('Nouvel agents')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Modifier un agent'/>
      <AgentForm data={getAgentFakeData()[0]}/>
    </BodyContainer>
  )
  
}

export default memo(EditAgent)
