import type {Agent} from "../model/agentService.ts";
import {useCallback} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetAllAgentsQuery} from "../model/agent.api.slice.ts";

export default function useGetAgentsOptions() {
  
  const { data: agents = [], isSuccess } = useGetAllAgentsQuery('LIST')
  
  return useCallback(() => {
    
    const options: MultiValue<SelectOptionType> = []
    
    if (isSuccess && agents.length > 0) {
      agents.forEach((a: Agent): void => {
        options.push({
          label: a?.fullName?.toUpperCase() ?? a.nom.toUpperCase(),
          value: a?.fullName?.toUpperCase() ?? a.nom.toUpperCase(),
          data: a['@id'],
        })
      })
    }
    
    return options
    
  }, [agents, isSuccess])
  
}
