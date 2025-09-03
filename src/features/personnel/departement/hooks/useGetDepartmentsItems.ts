import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Departement} from "../model/departementService.ts";

export default function useGetDepartmentsItems(
  data?: Departement[],
  setDepartments?: Dispatch<SetStateAction<Departement[]>>): void {
  
  useEffect((): void => {
    if (data && setDepartments) {
      setDepartments(data)
    }
  }, [data, setDepartments])
  
}
