import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {Service} from "../model/serviceService.ts";

export default function useGetServicesItems(data?: Service[], setServices?: Dispatch<SetStateAction<Service[]>>): void {
  
  useEffect((): void => {
    if (data && setServices) {
      setServices(data)
    }
  }, [data, setServices])
  
}
