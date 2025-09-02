import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../categorieLit/model/categorieLitService.ts";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import TypeConsultData from "./TypeConsultData.tsx";

export default function TypeConsultList({ typesConsults, setTypesConsults, isFetching, loader, onRefresh }: {
  typesConsults: TypeConsultation[]
  setTypesConsults: Dispatch<SetStateAction<TypeConsultation[]>>
  loader: boolean
  isFetching: boolean
  onRefresh: () => void
}) {
  
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des types'
        onSubmit={(): void => { }}
        loader={false}
        size='sm'
        md1={5}
        md2={7}
        md3={6}
        md4={6}
      />
      
      <ActionsComp
        nbElements={4}
        options={getgetCategorieLitActionsOptions()}
        state={action}
        setState={setAction}
        loader={false}
        size='sm'
      />
      
      <TypeConsultData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        typesConsults={typesConsults}
        setTypesConsults={setTypesConsults}
        loader={loader}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
