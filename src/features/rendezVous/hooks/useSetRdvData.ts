import type {RendezVous, SaveRendezVous} from "../model/rendezVousService.ts";
import type {Dispatch} from "react";
import {useEffect} from "react";
import type {SelectOptionType} from "../../../services/services.ts";

export default function useSetRdvData(data?: RendezVous, setState?: Dispatch<SaveRendezVous>): void {
  
  useEffect((): void => {
    if (data && setState) {
      const fkAgent: SelectOptionType | null = data?.fkAgent ? {
        label: data.fkAgent.nom.toUpperCase(),
        value: data.fkAgent.nom.toUpperCase(),
        data: data.fkAgent['@id'],
      } : null
      
      setState({
        id: data.id,
        date: data?.date ? data.date.substring(0, 16): '',
        tel: data.tel,
        email: data?.email ?? '',
        nom: data.nom,
        end: data.done,
        objet: data.objet,
        fkAgent,
      })
    }
  }, [data, setState])
  
}
