import type {CategorieExam} from "../model/categorieExamService.ts";
import {useGetExamensByCategoryQuery} from "../../examen/model/examen.api.slice.ts";
import {useState} from "react";
import type {Examen} from "../../examen/model/examenService.ts";
import useSetExamsItems from "../../examen/hooks/useSetExamsItems.ts";
import {Card} from "react-bootstrap";
import ExamsList from "../../examen/view/ExamsList.tsx";

export default function ExamsByCategory({ category }: { category: CategorieExam }) {
  
  const { data, isLoading, isFetching, refetch } = useGetExamensByCategoryQuery(category.id)
  
  const [exams, setExams] = useState<Examen[]>([])
  
  useSetExamsItems(data, setExams)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <>
      <ExamsList
        exams={exams}
        setExams={setExams}
        onRefresh={onRefresh}
        loader={isLoading}
        isFetching={isFetching}
      />
    </>
  )
  
}
