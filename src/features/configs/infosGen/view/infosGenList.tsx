import type {InfosGen} from "../model/infosGenService.ts";
import InfoForm from "./InfoForm.tsx";
import {useGetUniqueInfosQuery} from "../model/infosGen.api.slice.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setInfosGen} from "../model/infosGen.slice.ts";

export default function InfosGenList({ infos }: { infos: InfosGen }) {
  
  const { refetch, isSuccess, data } = useGetUniqueInfosQuery(1)
  
  const dispatch = useDispatch()
  
  const onRefresh = async (): Promise<void> => {
    await refetch()
  }
  
  useEffect((): void => {
    if (isSuccess && data) {
      dispatch(setInfosGen({
        infos: {
          id: data.id,
          nom: data.nom,
          slogan: data?.slogan ?? undefined,
          logo: data?.logo ?? undefined,
          about: data?.about ?? undefined,
          address: data?.address ?? undefined,
          tel: data.tel,
          email: data?.email ?? undefined,
          tel2: data?.tel2 ?? undefined,
          email2: data?.email2 ?? undefined,
          selected: data.selected,
        }
      }))
    }
  }, [data, dispatch, isSuccess])
  
  return (
    <>
      <div className='mb-6'>
        <h4 className='mb-1 pe-4 px-4 pt-5'>Paramètres</h4>
      </div>
      
      <InfoForm data={infos} onRefresh={onRefresh} />
    </>
  )
  
}
