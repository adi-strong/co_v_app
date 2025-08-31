import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {CurrencyType} from "../../../../config/configs.ts";
import {getCurrencies} from "../../../../config/configs.ts";

export default function useGetCurrencyOptions() {
  
  const currencies: CurrencyType = getCurrencies()
  
  return useCallback(() => {
    let options: SelectOptionType[] = []
    if (currencies) {
      options = [
        {
          label: currencies.first.label,
          value: currencies.first.code,
        },
        {
          label: currencies.last.label,
          value: currencies.last.code,
        },
      ]
    }
    
    return options
  }, [currencies])
  
}
