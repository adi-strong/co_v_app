import type {InfosPayloadType} from "../model/infosGen.slice.ts";
import type {Dispatch, SetStateAction} from "react";
import type {InfosGen} from "../model/infosGenService.ts";
import {useEffect} from "react";

export default function useSetInfosGenDataItem(state?: InfosPayloadType | null, setInfo?: Dispatch<SetStateAction<InfosGen>>): void {
  
  useEffect((): void => {
    if (state && setInfo) {
      setInfo({
        nom: state.nom,
        slogan: state?.slogan ?? undefined,
        email2: state?.email2 ?? undefined,
        tel: state.tel,
        tel2: state?.tel2 ?? undefined,
        id: state.id,
        email: state?.email ?? undefined,
        address: state?.address ?? undefined,
        about: state?.about ?? undefined,
        selected: false,
        logo: state?.logo ?? undefined,
      })
    }
  }, [state, setInfo])
  
}
