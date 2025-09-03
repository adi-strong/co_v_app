import type {ComptePayloadType} from "../model/compteCaisse.slice.ts";
import type {Dispatch, SetStateAction} from "react";
import type {CompteCaisse} from "../model/compteCaisseService.ts";
import {useEffect} from "react";

export default function useSetCompteItem(
  data?: ComptePayloadType | null,
  setCaisse?: Dispatch<SetStateAction<CompteCaisse>>): void {
  
  useEffect(() => {
    if (data && setCaisse) {
      setCaisse(prev => ({
        ...prev,
        slug: data.slug,
        id: data.id,
        nom: data.nom,
        selected: data.selected,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
        fkUser: data.fkUser,
        taux: Number(data.taux),
        first: data.first,
        last: data.last,
        solde: data.solde,
        estCeParDefaut: data.estCeParDefaut,
      }))
    }
  }, [data, setCaisse])
  
}
