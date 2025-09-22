import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Agent, AgentImage} from "./agentService.ts";

export default function useSetAgentImageData(data?: Agent, setState?: Dispatch<SetStateAction<AgentImage>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(state => ({
        ...state,
        agentId: data.id,
      }))
    }
  }, [data, setState])
  
}
