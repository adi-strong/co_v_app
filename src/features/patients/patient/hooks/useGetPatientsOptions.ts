import {useCallback} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {Patient} from "../model/patientService.ts";
import {getPatientFakeData} from "../model/patientService.ts";

export default function useGetPatientsOptions() {
  
  const patients: Patient[] = getPatientFakeData()
  
  return useCallback(() => {
    const options: MultiValue<SelectOptionType> = []
    
    if (patients.length > 0) {
      patients.forEach((p: Patient): void => {
        options.push({
          label: p?.fullName?.toUpperCase() ?? p.nom,
          value: p?.fullName?.toUpperCase() ?? p.nom,
          data: p['@id']
        })
      })
    }
    
    return options
  }, [patients])
  
}
