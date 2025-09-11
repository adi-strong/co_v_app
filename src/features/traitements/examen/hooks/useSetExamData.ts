import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Examen, SaveExamen} from "../model/examenService.ts";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useSetExamData(
  data: Examen,
  setState?: Dispatch<SetStateAction<SaveExamen>>
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
        ...prev,
        id: data.id,
        nom: data.nom,
        prixHt: Number(data.prixHt),
        prixTtc: Number(data.prixTtc),
        fkCategorie,
      }))
    }
  }, [data, setState])
  
}
