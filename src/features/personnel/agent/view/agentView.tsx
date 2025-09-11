import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import AgentsList from "./AgentsList.tsx";
import type {Agent} from "../model/agentService.ts";
import {useGetAgentsQuery} from "../model/agent.api.slice.ts";
import useGetAgentsItems from "../hooks/useGetAgentsItems.ts";

const AgentView = () => {
  
  useDocumentTitle('Agents')
  useActivePage('agents')
  
  const { data, isLoading, isFetching, refetch } = useGetAgentsQuery('LIST')
  
  const [agents, setAgents] = useState<Agent[]>([])
  
  useGetAgentsItems(data, setAgents)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Agents' />
      
      <Card>
        <AgentsList
          onRefresh={onRefresh}
          loader={isLoading}
          isFetching={isFetching}
          agents={agents}
          setAgents={setAgents}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(AgentView)
