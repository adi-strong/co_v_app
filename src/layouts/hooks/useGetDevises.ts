import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../../features/finances/compteCaisse/model/compteCaisse.slice.ts";
import {useEffect} from "react";
import {setDeviseState} from "../../features/finances/compteCaisse/model/devise.slice.ts";
import type {SelectOptionType} from "../../services/services.ts";

export default function useGetDevises(dispatch: (params?: any) => void): void {
  
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  useEffect((): void => {
    if (compte) {
      const options: SelectOptionType[] = [
        { label: compte.first.label, value: compte.first.code },
        { label: compte.last.label, value: compte.last.code },
      ]
      
      dispatch(setDeviseState({
        devise: {
          options
        }
      }))
    }
  }, [dispatch, compte])
  
}
