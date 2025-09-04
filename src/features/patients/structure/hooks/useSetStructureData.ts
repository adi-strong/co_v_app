import type {SaveStructure, Structure} from "../model/structureService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetStructureData(data?: Structure, setState?: Dispatch<SetStateAction<SaveStructure>>): void {
  
  useEffect((): void => {
    if (data && setState) setState({
      id: data.id,
      tel: data.tel,
      email: data?.email ?? '',
      nom: data.nom,
      focal: data?.focal ?? '',
    })
  }, [data, setState])
  
}
