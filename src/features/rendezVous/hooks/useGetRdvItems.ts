import type {RendezVous} from "../model/rendezVousService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useGetRdvItems(data?: RendezVous[], setState?: Dispatch<SetStateAction<RendezVous[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
