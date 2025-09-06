import {useCallback} from "react";
import {useGetFournisseursQuery} from "../model/fournisseur.api.slice.ts";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Fournisseur} from "../model/fournisseurService.ts";

export default function useGetFournisseurOptions() {
  
  const { data: providers = [], isSuccess }= useGetFournisseursQuery('LIST' )
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    if (isSuccess && providers.length > 0) providers.forEach(({ id, nomCommercial, abreviation }: Fournisseur): void => {
      const label: string = `${nomCommercial.toUpperCase()}${abreviation ? ` (${abreviation})` : ''}`
      const value: string = label
      const data: string = `/api/fournisseurs/${id}`
      
      options.push({ label, value, data })
    })
    
    return options
  }, [isSuccess, providers])
  
}
