import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import AgentsList from "./AgentsList.tsx";

const AgentView = () => {
  
  useDocumentTitle('Agents')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Agents' />
      
      <Card>
        <AgentsList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(AgentView)
