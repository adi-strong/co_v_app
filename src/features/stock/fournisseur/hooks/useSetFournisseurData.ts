import type {Fournisseur, SaveFournisseur} from "../model/fournisseurService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetFournisseurData(data?: Fournisseur, setState?: Dispatch<SetStateAction<SaveFournisseur>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState({
        id: data.id,
        tel: data.tel,
        email: data?.email ?? '',
        nom: data?.nom ?? '',
        focal: data?.focal ?? '',
        adresse: data?.adresse ?? '',
        nomCommercial: data.nomCommercial,
        abreviation: data?.abreviation ?? '',
      })
    }
  }, [data, setState])
  
}
