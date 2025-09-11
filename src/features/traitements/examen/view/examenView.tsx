import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import ExamsList from "./ExamsList.tsx";
import ExamForm from "./ExamForm.tsx";
import {useGetExamensQuery} from "../model/examen.api.slice.ts";
import type {Examen} from "../model/examenService.ts";
import useSetExamsItems from "../hooks/useSetExamsItems.ts";

const ExamenView = () => {
  
  useDocumentTitle('Examens')
  useActivePage('params')
  
  const { data, isLoading, isFetching, refetch } = useGetExamensQuery('LIST')
  
  const [exams, setExams] = useState<Examen[]>([])
  
  useSetExamsItems(data, setExams)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Examens'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <ExamForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <ExamsList
            exams={exams}
            setExams={setExams}
            loader={isLoading}
            isFetching={isFetching}
            onRefresh={onRefresh}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(ExamenView)
