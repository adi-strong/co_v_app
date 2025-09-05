import type {Produit, SaveProduit} from "../model/produitService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useSetProduitData(data?: Produit, setState?: Dispatch<SetStateAction<SaveProduit>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      const fkUnite: SelectOptionType | null = data?.fkUnite ? {
        label: data.fkUnite.nom.toUpperCase(),
        value: data.fkUnite.nom.toUpperCase(),
        data: data.fkUnite['@id'],
      } : null
      
      const fkCategorie: SelectOptionType | null = data?.fkCategorie ? {
        label: data.fkCategorie.nom.toUpperCase(),
        value: data.fkCategorie.nom.toUpperCase(),
        data: data.fkCategorie['@id'],
      } : null
      
      setState(prev => ({
        ...prev,
        id: data.id,
        nom: data.nom,
        codeBar: data?.codeBar ?? '',
        codeQr: data?.codeQr ?? '',
        code: data.code,
        description: data?.description ?? '',
        fkUnite,
        fkCategorie,
      }))
    }
  }, [data, setState])
  
}
