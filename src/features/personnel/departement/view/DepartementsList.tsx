import {useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import type {Departement} from "../model/departementService.ts";
import {getDepartementFakeData} from "../model/departementService.ts";
import DepartementData from "./DepartementData.tsx";

export default function DepartementsList() {
  
  const [departements, setDepartements] = useState<Departement[]>(getDepartementFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des départements'
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
      
      <DepartementData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        departements={departements}
        setDepartements={setDepartements}
      />
    </>
  )
  
}
