import type {CompteCaisse} from "../model/compteCaisseService.ts";
import {useGetUniqueCompteQuery} from "../model/compteCaisse.api.slice.ts";
import {useDispatch} from "react-redux";
import useSetRefreshCompteCaisse from "../hooks/useSetRefreshCompteCaisse.ts";
import UniqueCompteForm from "./UniqueCompteForm.tsx";

export default function UniqeCaisse({ caisse }: {caisse: CompteCaisse}) {
  
  const dispatch = useDispatch()
  
  const { refetch } = useGetUniqueCompteQuery(1)
  
  useSetRefreshCompteCaisse(dispatch)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <>
      <div className='mb-6'>
        <h4 className='mb-1 pe-4 px-4 pt-5'>Devises & Taux</h4>
      </div>
      
      <UniqueCompteForm onRefresh={onRefresh} data={caisse} />
    </>
  )
  
}
