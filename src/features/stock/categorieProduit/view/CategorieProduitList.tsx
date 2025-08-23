import {useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import type {CategorieProduit} from "../model/categorieProduitService.ts";
import {getCategorieProduitFakeData} from "../model/categorieProduitService.ts";
import CategorieProduitData from "./CategorieProduitData.tsx";

export default function CategorieProduitList() {
  
  const [categories, setCategories] = useState<CategorieProduit[]>(getCategorieProduitFakeData())
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
      
      <CategorieProduitData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  )
  
}
