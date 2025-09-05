import type {Fournisseur} from "../model/fournisseurService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useGetFournisseursItems(data?: Fournisseur[], setState?: Dispatch<SetStateAction<Fournisseur[]>>): void {
  
  useEffect((): void => {
    if (data && setState) setState(data)
  }, [data, setState])
  
}
