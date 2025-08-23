import {useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../../traitements/categorieLit/model/categorieLitService.ts";
import type {Fonction} from "../model/fonctionService.ts";
import {getFonctionFakeData} from "../model/fonctionService.ts";
import FonctionData from "./FonctionData.tsx";

export default function FonctionsList() {
  
  const [fonctions, setFonctions] = useState<Fonction[]>(getFonctionFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des fonctions'
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
      
      <FonctionData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        fonctions={fonctions}
        setFonctions={setFonctions}
      />
    </>
  )
  
}
