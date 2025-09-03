import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Departement, SaveDepartement} from "../model/departementService.ts";

export default function useSetDepartmentData(
  data?: Departement,
  setDepartment?: Dispatch<SetStateAction<SaveDepartement>>): void {
  
  useEffect((): void => {
    if (data && setDepartment) {
      setDepartment({ nom: data.nom, id: data.id })
    }
  }, [data, setDepartment])
  
}
