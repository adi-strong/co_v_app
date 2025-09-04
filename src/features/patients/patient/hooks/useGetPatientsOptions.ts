import {useCallback} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Patient} from "../model/patientService.ts";
import {useGetPatientsQuery} from "../model/patient.api.slice.ts";

export default function useGetPatientsOptions() {
  
  const { data: patients = [], isSuccess } = useGetPatientsQuery('LIST')
  
  return useCallback(() => {
    const options: SelectOptionType[] = []
    
    if (isSuccess && patients.length > 0) {
      patients.forEach((p: Patient): void => {
        options.push({
          label: p?.fullName?.toUpperCase() ?? p.nom,
          value: p?.fullName?.toUpperCase() ?? p.nom,
          data: p['@id']
        })
      })
    }
    
    return options
  }, [isSuccess, patients])
  
}
