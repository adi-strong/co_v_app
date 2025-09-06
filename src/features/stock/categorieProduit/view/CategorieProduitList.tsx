import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import type {CategorieProduit} from "../model/categorieProduitService.ts";
import CategorieProduitData from "./CategorieProduitData.tsx";

export default function CategorieProduitList({ categories, setCategories, onRefresh, isFetching, loader }: {
  categories: CategorieProduit[]
  setCategories: Dispatch<SetStateAction<CategorieProduit[]>>
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
        btnLabel='Rechercher'
        onSubmit={(): void => { }}
        loader={loader}
        size='sm'
        md1={5}
        md2={7}
        md3={9}
        md4={3}
      />
      
      <ActionsComp
        nbElements={4}
        options={getgetCategorieLitActionsOptions()}
        state={action}
        setState={setAction}
        loader={loader}
        size='sm'
      />
      
      <CategorieProduitData
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
