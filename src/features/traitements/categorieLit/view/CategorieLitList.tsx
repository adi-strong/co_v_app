import type {CategorieLit} from "../model/categorieLitService.ts";
import {Dispatch, SetStateAction, useState} from "react";
import CategorieLitData from "./CategorieLitData.tsx";
import {getgetCategorieLitActionsOptions} from "../model/categorieLitService.ts";
import {ActionsComp, SearchComp} from "../../../../components";

export default function CategorieLitList({ onRefresh, categories, isFetching, loader, setCategories }: {
  onRefresh: () => void
  categories: CategorieLit[]
  setCategories: Dispatch<SetStateAction<CategorieLit[]>>
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
        btnLabel='Rechercher'
        onSubmit={(): void => { }}
        loader={loader}
        size='sm'
        md1={5}
        md2={7}
        md3={8}
        md4={4}
      />
      
      <ActionsComp
        nbElements={4}
        options={getgetCategorieLitActionsOptions()}
        state={action}
        setState={setAction}
        loader={loader}
        size='sm'
      />
      
      <CategorieLitData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        categories={categories}
        setCategories={setCategories}
        loader={loader}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
