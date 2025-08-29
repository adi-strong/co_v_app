import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {
  formatDecimalNumberWithSpaces,
  handleShow,
  onMouseEnterEvent,
  onMouseLeaveEvent,
  setSelectedDataItem
} from "../../../../services/services.ts";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment";
import type {Examen} from "../model/examenService.ts";
import ExamForm from "./ExamForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function ExamItem(props: {
  exam: Examen
  setExams: Dispatch<SetStateAction<Examen[]>>
  index: number
}) {
  
  const {
    exam,
    index,
    setExams,
  } = props
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
  const { fkCategorie, createdAt, prixHt, prixTtc} = exam
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          className='text-capitalize'
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <CheckField
            inline
            name='selected'
            value={exam.selected}
            checked={exam.selected}
            onChange={(): void => setSelectedDataItem(index, setExams)}
            className='me-0'
          />
          <Link to={`/app/services/${exam.id}/${exam?.slug}`}>
            {exam.nom.toUpperCase()}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setIsEdit)}>
              Modifier
            </Button>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>{fkCategorie && fkCategorie?.nom ? fkCategorie.nom.toUpperCase() : '—'}</td>
        <td>{formatDecimalNumberWithSpaces(prixHt)}</td>
        <td>{formatDecimalNumberWithSpaces(prixTtc)}</td>
        
        <td>{createdAt ? moment(createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(exam, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={exam}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>examen : {exam.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier un examen'
        icon='pencil-square'
        onRefresh={() => { }}
        children={<ExamForm data={exam}/> as ReactNode}
      />
    </>
  )
  
}
