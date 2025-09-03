import {useEffect} from "react";
import {useGetUniqueCompteQuery} from "../model/compteCaisse.api.slice.ts";
import {setCompteCaisseState} from "../model/compteCaisse.slice.ts";

export default function useSetRefreshCompteCaisse(dispatch?: (params?: any) => void): void {
  
  const { refetch, isSuccess, data } = useGetUniqueCompteQuery(1)
  
  useEffect((): void => {
    if (dispatch && isSuccess && data) {
      dispatch(setCompteCaisseState({
        compte: {
          id: data.id,
          first: data.first,
          last: data.last,
          solde: data.solde,
          nom: data.nom,
          taux: data.taux,
          fkUser: data?.fkUser ?? undefined,
          estCeParDefaut: data.estCeParDefaut,
          createdAt: data?.createdAt ?? undefined,
          updatedAt: data?.updatedAt ?? undefined,
          slug: data?.slug ?? undefined,
          selected: data.selected,
        }
      }))
    }
  }, [dispatch, isSuccess, data])
  
}
