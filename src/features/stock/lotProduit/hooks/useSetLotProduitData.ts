import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {LotProduit, SaveLotProduit} from "../model/lotProduitService.ts";

export default function useSetLotProduitData(data?: LotProduit, setState?: Dispatch<SetStateAction<SaveLotProduit>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      const fkUnite: SelectOptionType | null = data?.fkUnite ? {
        label: data.fkUnite.nom.toUpperCase(),
        value: data.fkUnite.nom.toUpperCase(),
        data: data.fkUnite['@id'],
      } : null
      
      const fkFournisseur: SelectOptionType | null = data?.fkFournisseur ? {
        label: data.fkFournisseur.nomCommercial.toUpperCase(),
        value: data.fkFournisseur.nomCommercial.toUpperCase(),
        data: data.fkFournisseur['@id'],
      } : null
      
      setState(prev => ({
        id: data.id,
        tva: data?.tva ? Number(data.tva) : 0,
        prixTtc: Number(data.prixTtc),
        prixHt: Number(data.prixHt),
        fkUnite,
        fkFournisseur,
      }))
    }
  }, [data, setState])
  
}
