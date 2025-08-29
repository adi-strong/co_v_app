import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Examen} from "../model/examenService.ts";
import ExamItem from "./ExamItem.tsx";
import {getExamHeadItems} from "../model/examenService.ts";

export default function ExamData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  exams: Examen[]
  setExams: Dispatch<SetStateAction<Examen[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    exams,
    setExams,
  } = props
  
  return (
    <>
      <Table hover striped responsive>
        <thead>
        <tr>
          <th style={{ fontSize: '1rem' }}>
            <CheckField
              inline
              name='isSelectedAll'
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setExams)}
              value={isSelectedAll}
              checked={isSelectedAll}
              className='me-0'
            />
            Nom
          </th>
          
          {getExamHeadItems().length > 0 && getExamHeadItems().map(t => (
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>
          ))}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {exams.length > 0 && exams.map((c, index: number) =>
          <ExamItem
            key={index}
            exam={c}
            setExams={setExams}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
