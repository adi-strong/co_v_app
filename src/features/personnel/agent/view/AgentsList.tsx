import {useState} from "react";
import {getAgentFakeData} from "../model/agentService.ts";
import AgentData from "./AgentData.tsx";

export default function AgentsList() {
  
  const [agents, setAgents] = useState(getAgentFakeData())
  
  return (
    <>
      <AgentData
        agents={agents}
        setAgents={setAgents}
      />
    </>
  )
  
}

