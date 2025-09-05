import type {Fournisseur} from "../model/fournisseurService.ts";
import {getFournisseurFakeData} from "../model/fournisseurService.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetFournisseurOptions() {
  
  // const { data: providers = [], isSuccess }= useGetFournisseurOptions()
  
  return useCallback(() => {
    /* const options: SelectOptionType[] = []
    if (providers.length > 0) providers.forEach(({ id, nomCommercial, abreviation }): void => {
      const label: string = `${nomCommercial.toUpperCase()}${abreviation ? ` (${abreviation})` : ''}`
      const value: string = label
      const data: string = `/api/fournisseurs/${id}`
      
      options.push({ label, value, data })
    }) */
    
    return []
  }, [/* providers */])
  
}
