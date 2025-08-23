import {useState} from "react";
import type {Service} from "../../../personnel/service/model/serviceService.ts";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import {getUniteConsommationFakeData} from "../model/uniteConsommationService.ts";
import UniteConsommationData from "./UniteConsommationData.tsx";

export default function UniteConsommationList() {
  
  const [unites, setUnites] = useState<Service[]>(getUniteConsommationFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des unités'
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
      
      <UniteConsommationData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        unites={unites}
        setUnites={setUnites}
      />
    </>
  )
  
}
