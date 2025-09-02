import {Dispatch, SetStateAction, useState} from "react";
import {
  getgetCategorieLitActionsOptions
} from "../../categorieLit/model/categorieLitService.ts";
import {ActionsComp, SearchComp} from "../../../../components";
import type {CategorieExam} from "../model/categorieExamService.ts";
import CategorieExamData from "./CategorieExamData.tsx";

export default function CategorieExamList({ onRefresh, categories, isFetching, loader, setCategories }: {
  onRefresh: () => void
  categories: CategorieExam[]
  setCategories: Dispatch<SetStateAction<CategorieExam[]>>
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
      
      <CategorieExamData
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
