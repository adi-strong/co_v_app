import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Lit, SaveLit} from "../model/litService.ts";

export default function useSetLitData(
  data: Lit,
  setState?: Dispatch<SetStateAction<SaveLit>>
): void {
  
  useEffect(() => {
    if (data && setState) {
      const fkCategorie: SelectOptionType | null = data?.fkCategorie ? {
        label: data.fkCategorie.nom.toUpperCase(),
        value: data.fkCategorie.nom.toUpperCase(),
        data: data.fkCategorie['@id'],
        id: data.fkCategorie.id,
      } : null
      
      setState(prev => ({
        id: data.id,
        numero: data.numero,
        prix: Number(data.prix),
        fkCategorie,
        mode: data.mode,
      }))
    }
  }, [data, setState])
  
}
