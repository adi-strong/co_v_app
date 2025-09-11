import {useCallback} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetAvailableBedsQuery} from "../model/lit.api.slice.ts";
import type {Lit} from "../model/litService.ts";

export default function useGetLitsOptions() {
  
  const { data: lits = [], isSuccess } = useGetAvailableBedsQuery('LIST')
  
  return useCallback(() => {
    const options: MultiValue<SelectOptionType> = []
    if (isSuccess && lits.length > 0) lits.forEach((lit: Lit): void => {
      const category = lit?.fkCategorie
      options.push({
        label: lit.numero.toUpperCase() + `${category ? ` / ${category.nom.toUpperCase()}` : ''}`,
        value: lit.numero.toUpperCase() + `${category ? ` / ${category.nom.toUpperCase()}` : ''}`,
        data: lit['@id'],
        id: lit.id,
      })
    })
    
    return options
  }, [lits , isSuccess])
  
}
