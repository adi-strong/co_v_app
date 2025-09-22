import {useGetAgentsByFunctionQuery} from "../../agent/model/agent.api.slice.ts";
import {useState} from "react";
import type {Agent} from "../../agent/model/agentService.ts";
import useGetAgentsItems from "../../agent/hooks/useGetAgentsItems.ts";
import {Card} from "react-bootstrap";
import AgentsList from "../../agent/view/AgentsList.tsx";
import type {Fonction} from "../model/fonctionService.ts";

export default function AgentsByFunctionList({ fonction }: { fonction: Fonction }) {
  
  const { data, isLoading, isFetching, refetch } = useGetAgentsByFunctionQuery(fonction.id)
  
  const [agents, setAgents] = useState<Agent[]>([])
  
  useGetAgentsItems(data, setAgents)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <Card>
      <AgentsList
        onRefresh={onRefresh}
        loader={isLoading}
        isFetching={isFetching}
        agents={agents}
        setAgents={setAgents}
      />
    </Card>
  )
  
}
