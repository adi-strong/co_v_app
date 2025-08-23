import {useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../categorieLit/model/categorieLitService.ts";
import type {Lit} from "../model/litService.ts";
import {getLitsFakeData} from "../model/litService.ts";
import LitData from "./LitData.tsx";

export default function LitsLits() {
  
  const [lits, setLits] = useState<Lit[]>(getLitsFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des lits'
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
      
      <LitData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        lits={lits}
        setLits={setLits}
      />
    </>
  )
  
}
