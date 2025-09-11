import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetAgentsByFonctionQuery} from "../model/agent.api.slice.ts";
import {useCallback} from "react";
import type {Fonction} from "../../fonction/model/fonctionService.ts";
import type {Agent} from "../model/agentService.ts";

export default function useGetAgentsByFunctionOptions(keywords?: string): () => SelectOptionType[] {
  
  const { data, isSuccess } = useGetAgentsByFonctionQuery(keywords)
  
  return useCallback((): SelectOptionType[] => {
    const options: SelectOptionType[] = []
    if (data && keywords && isSuccess) data.forEach((func: Fonction): void => {
      const agents = func.agents
      if (agents.length > 0) agents.forEach((agent: Agent): void => {
        options.push({
          label: agent?.fullName?.toUpperCase() ?? agent.nom.toUpperCase(),
          value: agent?.fullName?.toUpperCase() ?? agent.nom.toUpperCase(),
          data: agent['@id'],
        })
      })
    })
    
    return options
  }, [data, keywords, isSuccess])
  
}
