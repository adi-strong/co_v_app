import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SaveTypeConsultation, TypeConsultation} from "../model/typeConsultationService.ts";

export default function useSetTypeConsultationsData(
  data: TypeConsultation,
  setType?: Dispatch<SetStateAction<SaveTypeConsultation>>
): void {
  
  useEffect(() => {
    if (data && setType) {
      setType(prev => ({
        id: data.id,
        nom: data.nom,
        prixTtc: Number(data.prixTtc),
        prixHt: Number(data.prixHt),
        taxe: Number(data?.taxe),
      }))
    }
  }, [data, setType])
  
}
