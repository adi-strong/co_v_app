import {useState} from "react";
import {ActionsComp, SearchComp} from "../../../../components";
import {getgetCategorieLitActionsOptions} from "../../categorieLit/model/categorieLitService.ts";
import type {Examen} from "../model/examenService.ts";
import {getExamenFakeData} from "../model/examenService.ts";
import ExamData from "./ExamData.tsx";

export default function ExamsList() {
  
  const [exams, setExams] = useState<Examen[]>(getExamenFakeData())
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{keyword: string}>({keyword: ''})
  const [action, setAction] = useState<string>('')
  
  return (
    <>
      <SearchComp
        state={search}
        value={search.keyword}
        setState={setSearch}
        btnLabel='Rechercher des examens'
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
      
      <ExamData
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        exams={exams}
        setExams={setExams}
      />
    </>
  )
  
}
