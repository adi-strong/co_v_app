import {useLazyGetUniqueInfosQuery} from "../../features/configs/infosGen/model/infosGen.api.slice.ts";
import {RefObject, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import type {InfoGenState} from "../../features/configs/infosGen/model/infosGen.slice.ts";
import type {InfosGen} from "../../features/configs/infosGen/model/infosGenService.ts";
import {setInfosGen} from "../../features/configs/infosGen/model/infosGen.slice.ts";

export default function useSetInfos(dispatch: (params?: any) => void): void {
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  
  const [getUniqueInfos] = useLazyGetUniqueInfosQuery()
  
  const hasFetchedInfos: RefObject<boolean> = useRef(false)
  
  useEffect((): void => {
    const fetchInfos = async (): Promise<void> => {
      if (!(hasFetchedInfos.current && infos)) {
        hasFetchedInfos.current = true
        
        try {
          const infoSession: InfosGen = await getUniqueInfos(1).unwrap()
          dispatch(setInfosGen({ infos: {
              id: infoSession.id,
              nom: infoSession.nom,
              slogan: infoSession?.slogan ?? undefined,
              logo: infoSession?.logo ?? undefined,
              about: infoSession?.about ?? undefined,
              address: infoSession?.address ?? undefined,
              tel: infoSession.tel,
              email: infoSession?.email ?? undefined,
              tel2: infoSession?.tel2 ?? undefined,
              email2: infoSession?.email2 ?? undefined,
              selected: infoSession.selected,
            }}))
        } catch (error) { }
      }
    }
    
    fetchInfos()
  }, [getUniqueInfos, dispatch, infos])
}
