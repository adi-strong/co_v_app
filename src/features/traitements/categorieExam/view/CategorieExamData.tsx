import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {CategorieExam} from "../model/categorieExamService.ts";
import CategorieExamItem from "./CategorieExamItem.tsx";
import {RepeatableTableRows} from "../../../../loaders";

export default function CategorieExamData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  categories: CategorieExam[]
  setCategories: Dispatch<SetStateAction<CategorieExam[]>>
  loader: boolean
  isFetching: boolean
  onRefresh: () => void
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    categories,
    setCategories,
    isFetching,
    loader,
    onRefresh,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setCategories)}
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
          <th style={{ fontSize: '1rem' }}>Date</th>
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {categories.length > 0 && categories.map((c: CategorieExam, index: number) =>
          <CategorieExamItem
            key={index}
            category={c}
            setCategories={setCategories}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
