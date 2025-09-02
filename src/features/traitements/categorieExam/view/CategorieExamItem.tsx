import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {CheckField, SideContent} from "../../../../components";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import moment from "moment/moment";
import type {CategorieExam} from "../model/categorieExamService.ts";
import CategorieExamForm from "./CategorieExamForm.tsx";
import RemoveCategorieExamModal from "./RemoveCategorieExamModal.tsx";

export default function CategorieExamItem(props: {
  category: CategorieExam
  setCategories: Dispatch<SetStateAction<CategorieExam[]>>
  index: number
  onRefresh: () => void
}) {
  
  const {
    category,
    index,
    setCategories,
    onRefresh,
  } = props
  
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDel, setIsDel] = useState<boolean>(false)
  
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
            value={category.selected}
            checked={category.selected}
            onChange={(): void => setSelectedDataItem(index, setCategories)}
            className='me-0'
          />
          <Link to={`/app/categories-examens/${category.id}/${category?.slug}`}>
            {category.nom.toUpperCase()}
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
        
        <td>{category?.createdAt ? moment(category.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveCategorieExamModal
        onHide={(): void => handleShow(setIsDel)}
        data={category}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier la catégorie'
        icon='pencil-square'
        children={
          <CategorieExamForm
            data={category}
            onRefresh={onRefresh}
            onHide={(): void => handleShow(setIsEdit)}
          /> as ReactNode
        }
      />
    </>
  )
}
