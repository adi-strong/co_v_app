import type {Fonction, SaveFonction} from "../../fonction/model/fonctionService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SaveService, Service} from "../model/serviceService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useSetServiceData(data?: Service, setService?: Dispatch<SetStateAction<SaveService>>): void {
  
  useEffect((): void => {
    if (data && setService) {
      const fkDepartement: SingleValue<SelectOptionType> | null = data?.fkDepartement ? {
        label: data.fkDepartement.nom.toUpperCase(),
        value: data.fkDepartement.nom.toUpperCase(),
        data: data.fkDepartement['@id'],
      } : null
      
      setService({
        nom: data.nom,
        id: data.id,
        fkDepartement,
      })
    }
  }, [data, setService])
  
}
