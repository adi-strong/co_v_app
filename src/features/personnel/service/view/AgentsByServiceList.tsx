import {Card} from "react-bootstrap";
import {useGetAgentsByServiceQuery} from "../../agent/model/agent.api.slice.ts";
import {useState} from "react";
import type {Agent} from "../../agent/model/agentService.ts";
import useGetAgentsItems from "../../agent/hooks/useGetAgentsItems.ts";
import AgentsList from "../../agent/view/AgentsList.tsx";
import type {Service} from "../model/serviceService.ts";

export default function AgentsByServiceList({ service }: { service: Service }) {
  
  const { data, isLoading, isFetching, refetch } = useGetAgentsByServiceQuery(service.id)
  
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
