import type {InfosGen, SaveInfosGen} from "../model/infosGenService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetInfosGenData(data?: InfosGen, setInfo?: Dispatch<SetStateAction<SaveInfosGen>>): void {
  
  useEffect((): void => {
    if (data && setInfo) {
      setInfo({
        nom: data.nom,
        slogan: data?.slogan ?? '',
        tel: data.tel,
        email: data?.email ?? '',
        id: data.id,
        address: data?.address ?? '',
        email2: data?.email2 ?? '',
        tel2: data?.tel2 ?? '',
        about: data?.about ?? '',
        file: [],
        infosId: data.id,
      })
    }
  }, [data, setInfo])
  
}
