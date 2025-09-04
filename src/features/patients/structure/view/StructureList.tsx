import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import type {Structure} from "../model/structureService.ts";
import StructureData from "./StructureData.tsx";

export default function StructureList({ structures, setStructures, onRefresh, isFetching, loader }: {
  structures: Structure[]
  setStructures: Dispatch<SetStateAction<Structure[]>>
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
        btnLabel='Rechercher des structures'
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
      
      <StructureData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        structure={structures}
        setStructures={setStructures}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
