import type {Agent} from "../model/agentService.ts";
import {getAgentFakeData} from "../model/agentService.ts";
import {useCallback} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useSetDoctorOptions() {
  
  const agents: Agent[] = getAgentFakeData()
  
  return useCallback(() => {
    
    const options: MultiValue<SelectOptionType> = []
    
    if (agents.length > 0) {
      agents.forEach((a: Agent): void => {
        options.push({
          label: a?.fullName?.toUpperCase() ?? a.nom.toUpperCase(),
          value: a?.fullName?.toUpperCase() ?? a.nom.toUpperCase(),
          data: a['@id'],
        })
      })
    }
    
    return options
    
  }, [agents])
  
}
