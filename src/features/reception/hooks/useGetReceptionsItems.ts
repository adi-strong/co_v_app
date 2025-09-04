import type {Reception} from "../model/receptionService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useGetReceptionsItems(data?: Reception[], setReceptions?: Dispatch<SetStateAction<Reception[]>>): void {
  
  useEffect((): void => {
    if (data && setReceptions) setReceptions(data)
  }, [data, setReceptions])
  
}
