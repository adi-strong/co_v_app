import {useGetExpenseTypesQuery} from "../model/typesDepenses.api.slice.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetExpensesTypesOptions(isID?: boolean) {
  
  const {
    data: types = [],
    isError,
    isSuccess,
  } = useGetExpenseTypesQuery('LIST')
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    
    if (!isError && isSuccess && types.length > 0) {
      for (const key in types) {
        const expenseType = types[key]
        const { id, nom } = expenseType
        
        const sousTypeDepenses = expenseType?.sousTypeDepenses
        && expenseType.sousTypeDepenses.length > 0
          ? expenseType.sousTypeDepenses.map(s => ({
            label: s.nom.toUpperCase(),
            value: s.nom.toUpperCase(),
            typeId: id,
          })) : []
        
        const data: string = isID ? id.toString() : `/api/type_depenses/${id}`
        const label = nom.toUpperCase()
        
        options.push({
          data,
          label,
          value: label,
          subData: sousTypeDepenses,
          typeId: id,
        })
      }
    }
    
    return options
  }, [isError, isID, isSuccess, types])
  
}
