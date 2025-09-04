import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import type {Service} from "../model/serviceService.ts";
import ServiceData from "./ServiceData.tsx";

export default function ServicesList({ services, setServices, onRefresh, isFetching, loader }: {
  services: Service[]
  setServices: Dispatch<SetStateAction<Service[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
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
        btnLabel='Rechercher des services'
        onSubmit={(): void => { }}
        loader={loader}
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
        loader={loader}
        size='sm'
      />
      
      <ServiceData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        services={services}
        setServices={setServices}
        loader={loader}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
