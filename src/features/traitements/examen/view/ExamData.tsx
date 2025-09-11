import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Examen} from "../model/examenService.ts";
import ExamItem from "./ExamItem.tsx";
import {getExamHeadItems} from "../model/examenService.ts";
import {RepeatableTableRows} from "../../../../loaders";

export default function ExamData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  exams: Examen[]
  setExams: Dispatch<SetStateAction<Examen[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    exams,
    setExams,
    onRefresh,
    loader,
    isFetching,
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
            
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            
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
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
