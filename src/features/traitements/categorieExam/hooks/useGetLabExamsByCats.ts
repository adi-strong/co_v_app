import type {ExamenPrescrit} from "../../prescription/model/prescriptionService.ts";
import type {CategoryExamPayload, CategoryExamState} from "../model/categorieExam.slice.ts";
import {Dispatch, SetStateAction, useEffect} from "react";
import {useSelector} from "react-redux";

export default function useGetLabExamsByCats(
  examsPrescrits?: ExamenPrescrit[],
  setState?: Dispatch<SetStateAction<CategoryExamPayload[]>>
): void {
  
  const { categoriesExams } = useSelector((state: CategoryExamState) => state.categoriesExams)
  
  useEffect(() => {
    if (examsPrescrits && categoriesExams && setState) {
      const prescribedExamIds = new Set(
        examsPrescrits.map((examPres) => examPres.fkExam.id)
      );
      
      const updatedCategories = categoriesExams.map((category) => {
        const updatedExams = category.exams.map((exam) => ({
          ...exam,
          selected: prescribedExamIds.has(exam.id),
        }));
        
        return {
          ...category,
          exams: updatedExams,
        };
      });
      
      setState(updatedCategories);
    }
  }, [examsPrescrits, setState, categoriesExams]);
  
  
}
