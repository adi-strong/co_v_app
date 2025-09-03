import {Dispatch, SetStateAction} from "react";
import AgentData from "./AgentData.tsx";
import type {Agent} from "../model/agentService.ts";

export default function AgentsList({ agents, setAgents, onRefresh, isFetching, loader }: {
  agents: Agent[]
  setAgents: Dispatch<SetStateAction<Agent[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <AgentData
        agents={agents}
        setAgents={setAgents}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
