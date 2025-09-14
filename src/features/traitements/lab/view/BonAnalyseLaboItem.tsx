import type {CategoryExamPayload} from "../../categorieExam/model/categorieExam.slice.ts";
import {Col} from "react-bootstrap";
import type {ReactNode} from "react";

export default function BonAnalyseLaboItem({ category }: { category: CategoryExamPayload }) {
  
  const { nom, exams } = category
  
  return (
    <>
      <Col sm={6} className='mb-2 mt-2 text-dark'>
        <h5 className='text-uppercase fw-bold'>{nom}</h5>
        {exams.map(({ nom, selected }, index) => (
          <p key={index}>
            <i className={`bi bi-${selected ? 'x-square text-primary' : 'square'}`}/> {nom.toUpperCase()}
          </p>
        ) as ReactNode)}
      </Col>
    </>
  )
  
}
