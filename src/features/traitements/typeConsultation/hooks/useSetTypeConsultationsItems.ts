import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {TypeConsultation} from "../model/typeConsultationService.ts";

export default function useSetTypeConsultationsItems(
  data: TypeConsultation[],
  setTypes: Dispatch<SetStateAction<TypeConsultation[]>>
): void {
  
  useEffect(() => {
    if (data && data.length > 0) {
      setTypes(data)
    }
  }, [data, setTypes]);
  
}
