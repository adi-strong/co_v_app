import type {CategorieLit} from "../model/categorieLitService.ts";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import {CheckField, RemoveModal, SideContent} from "../../../../components";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../../services/services.ts";
import {Link} from "react-router-dom";
import moment from "moment";
import {Button} from "react-bootstrap";
import {useState} from "react";
import CategorieLitForm from "./CategorieLitForm.tsx";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function CategorieLitItem(props: {
  category: CategorieLit
  setCategories: Dispatch<SetStateAction<CategorieLit[]>>
  index: number
}) {
  
  const {
    category,
    index,
    setCategories,
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
          <Link to={`/app/categories-lits/${category.id}/${category?.slug}`}>
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
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(category, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={category}
        show={isDel}
        onRefresh={(): void => { }}
        title={<>catégorie : <br/> {category.nom.toUpperCase()}</>}
      />
      
      <SideContent
        show={isEdit}
        onHide={(): void => handleShow(setIsEdit)}
        title='Modifier la catégorie'
        onRefresh={() => { }}
        children={<CategorieLitForm data={category}/> as ReactNode}
      />
    </>
  )
  
}
