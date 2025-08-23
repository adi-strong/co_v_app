import {useState} from "react";
import {
  getgetCategorieLitActionsOptions
} from "../../categorieLit/model/categorieLitService.ts";
import {ActionsComp, SearchComp} from "../../../../components";
import type {CategorieExam} from "../model/categorieExamService.ts";
import {getCategorieExamFakeData} from "../model/categorieExamService.ts";
import CategorieExamData from "./CategorieExamData.tsx";

export default function CategorieExamList() {
  
  const [categories, setCategories] = useState<CategorieExam[]>(getCategorieExamFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des catégories'
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
      
      <CategorieExamData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  )
  
}
