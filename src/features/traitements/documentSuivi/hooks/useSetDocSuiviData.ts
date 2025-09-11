import type {DocumentSuivi, SaveDocumentSuivi} from "../model/documentSuiviService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetDocSuiviData(data?: DocumentSuivi, setState?: Dispatch<SetStateAction<SaveDocumentSuivi>>): void {
  
  useEffect((): void => {
    if (data && setState) {
      setState(prev => ({
        ...prev,
        dateFin: data?.dateFin ? data.dateFin.substring(0, 10) : '',
        dateDebut: data?.dateDebut ? data.dateDebut.substring(0, 10) : '',
        id: data.id,
        motif: data.motif,
        statut: data.statut,
      }))
    }
  }, [data, setState])
  
}
