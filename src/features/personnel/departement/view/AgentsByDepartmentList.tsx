import type {Departement} from "../model/departementService.ts";
import {Card} from "react-bootstrap";
import {useGetAgentsByDepartmentQuery} from "../../agent/model/agent.api.slice.ts";
import {useState} from "react";
import type {Agent} from "../../agent/model/agentService.ts";
import useGetAgentsItems from "../../agent/hooks/useGetAgentsItems.ts";
import AgentsList from "../../agent/view/AgentsList.tsx";

export default function AgentsByDepartmentList({ department }: { department: Departement }) {
  
  const { data, isLoading, isFetching, refetch } = useGetAgentsByDepartmentQuery(department.id)
  
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
