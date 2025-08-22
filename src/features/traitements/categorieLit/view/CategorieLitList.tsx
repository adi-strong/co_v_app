import type {CategorieLit} from "../model/categorieLitService.ts";
import {useState} from "react";
import CategorieLitData from "./CategorieLitData.tsx";
import {getCategorieLitFakeData, getgetCategorieLitActionsOptions} from "../model/categorieLitService.ts";
import {Col, Row} from "react-bootstrap";
import {ActionsComp, SearchComp} from "../../../../components";

export default function CategorieLitList() {
  
  const [categories, setCategories] = useState<CategorieLit[]>(getCategorieLitFakeData())
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
      
      <CategorieLitData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  )
  
}
