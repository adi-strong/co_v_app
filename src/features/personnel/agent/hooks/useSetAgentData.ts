import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Agent, SaveAgent} from "../model/agentService.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Departement} from "../../departement/model/departementService.ts";
import type {Service} from "../../service/model/serviceService.ts";

export default function useSetAgentData(
  data?: Agent,
  setAgent?: Dispatch<SetStateAction<SaveAgent>>,
  setServicesOptions?: Dispatch<SetStateAction<SelectOptionType[]>>
): void {
  
  useEffect((): void => {
    if (data && setAgent && setServicesOptions) {
      let fkDepartement: SingleValue<SelectOptionType> | null = null
      if (data?.fkDepartement) {
        const department: Departement = data.fkDepartement
        const services: Service[] = department.services
        
        const subData: SelectOptionType[] = services && services.length > 0
          ? services.map(({ id, nom }) => ({
            label: nom.toUpperCase(),
            value: nom.toUpperCase(),
            data: `/api/services/${id}`
          })) : []
        
        fkDepartement = {
          label: department.nom.toUpperCase(),
          value: department.nom.toUpperCase(),
          data: department['@id'],
          subData,
        }
        
        setServicesOptions(subData)
      }
      
      const fkFonction: SingleValue<SelectOptionType> | null = data?.fkFonction ? {
        label: data.fkFonction.nom.toUpperCase(),
        value: data.fkFonction.nom.toUpperCase(),
        data: data.fkFonction['@id'],
      } : null
      
      const fkService: SingleValue<SelectOptionType> | null = data?.fkService ? {
        label: data.fkService.nom.toUpperCase(),
        value: data.fkService.nom.toUpperCase(),
        data: data.fkService['@id'],
      } : null
      
      setAgent(prev => ({
        ...prev,
        id: data.id,
        email: data?.email ?? '',
        sexe: data?.sexe ?? '',
        prenom: data?.prenom ?? '',
        nom: data.nom,
        tel: data.tel,
        postNom: data?.postNom ?? '',
        fkDepartement,
        fkFonction,
        fkService,
      }))
    }
  }, [data, setAgent, setServicesOptions])
  
}
