import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import AgentForm from "./AgentForm.tsx";

const NewAgent = () => {
  
  useDocumentTitle('Nouvel agents')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouvel agent'/>
      <AgentForm/>
    </BodyContainer>
  )
  
}

export default memo(NewAgent)
