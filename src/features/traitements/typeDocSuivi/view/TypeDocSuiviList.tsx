import {useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../categorieLit/model/categorieLitService.ts";
import type {TypeDocSuivi} from "../model/typeDocSuiviService.ts";
import {getTypeDocSuiviFakeData} from "../model/typeDocSuiviService.ts";
import TypeDocSuiviData from "./TypeDocSuiviData.tsx";

export default function TypeDocSuiviList() {
  
  const [typesDocs, setTypesDocs] = useState<TypeDocSuivi[]>(getTypeDocSuiviFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des types'
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
      
      <TypeDocSuiviData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        typesDocs={typesDocs}
        setTypesDocs={setTypesDocs}
      />
    </>
  )
  
}
