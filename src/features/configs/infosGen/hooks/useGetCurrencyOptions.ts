import {useSelector} from "react-redux";
import type {DeviseState} from "../../../finances/compteCaisse/model/devise.slice.ts";
import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useGetCurrencyOptions() {
  
  const { devise } = useSelector((state: DeviseState) => state.devise)
  
  return useCallback((): SelectOptionType[] => {
    return devise ? devise.options : []
  }, [devise])
  
}
