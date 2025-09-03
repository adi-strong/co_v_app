import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Agent} from "../model/agentService.ts";

export default function useGetAgentsItems(data?: Agent[], setAgents?: Dispatch<SetStateAction<Agent[]>>): void {
  
  useEffect((): void => {
    if (data && setAgents) {
      setAgents(data)
    }
  }, [data, setAgents])
  
}
