import {Dispatch, SetStateAction, useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../categorieLit/model/categorieLitService.ts";
import type {Traitement} from "../model/traitementService.ts";
import TraitementData from "./TraitementData.tsx";

export default function TraitementList({ traitements, setTraitements, onRefresh, isFetching, loader }: {
  traitements: Traitement[]
  setTraitements: Dispatch<SetStateAction<Traitement[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({ keyword: '' })
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
      
      <TraitementData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        treatments={traitements}
        setTreatments={setTraitements}
        loader={loader}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
