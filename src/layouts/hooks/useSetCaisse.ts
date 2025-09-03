import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../../features/finances/compteCaisse/model/compteCaisse.slice.ts";
import type {RefObject} from "react";
import {useEffect, useRef} from "react";
import {useLazyGetUniqueCompteQuery} from "../../features/finances/compteCaisse/model/compteCaisse.api.slice.ts";
import type {CompteCaisse} from "../../features/finances/compteCaisse/model/compteCaisseService.ts";
import {setCompteCaisseState} from "../../features/finances/compteCaisse/model/compteCaisse.slice.ts";

export default function useSetCaisse(dispatch: (params?: any) => void): void {
  
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  const hasFetchCompte: RefObject<boolean> = useRef(false)
  
  const [getUniqueCompte] = useLazyGetUniqueCompteQuery()
  
  useEffect((): void => {
    const fetchCompte = async (): Promise<void> => {
      if (!(hasFetchCompte.current && compte)) {
        hasFetchCompte.current = true
        
        try {
          const compteSession: CompteCaisse = await getUniqueCompte(1).unwrap()
          dispatch(setCompteCaisseState({
            compte: {
              id: compteSession.id,
              first: compteSession.first,
              last: compteSession.last,
              solde: compteSession.solde,
              nom: compteSession.nom,
              taux: compteSession.taux,
              fkUser: compteSession?.fkUser ?? undefined,
              estCeParDefaut: compteSession.estCeParDefaut,
              createdAt: compteSession?.createdAt ?? undefined,
              updatedAt: compteSession?.updatedAt ?? undefined,
              slug: compteSession?.slug ?? undefined,
              selected: compteSession.selected,
            }
          }))
        } catch (e) { }
      }
    }
    
    fetchCompte()
  }, [compte, getUniqueCompte,dispatch])
  
}
