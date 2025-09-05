import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import UniteConsommationData from "./UniteConsommationData.tsx";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";

export default function UniteConsommationList({ unites, setUnites, onRefresh, isFetching, loader }: {
  unites: UniteConsommation[]
  setUnites: Dispatch<SetStateAction<UniteConsommation[]>>
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
        btnLabel='Rechercher des unités'
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
      
      <UniteConsommationData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        unites={unites}
        setUnites={setUnites}
        loader={loader}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
