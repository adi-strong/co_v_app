import type {Dispatch, SetStateAction} from "react";
import type {CategorieLit} from "../model/categorieLitService.ts";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import CategorieLitItem from "./CategorieLitItem.tsx";

export default function CategorieLitData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  categories: CategorieLit[]
  setCategories: Dispatch<SetStateAction<CategorieLit[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    categories,
    setCategories,
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
            Nom
          </th>
          <th style={{ fontSize: '1rem' }}>Date</th>
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {categories.length > 0 && categories.map((c: CategorieLit, index: number) =>
          <CategorieLitItem
            key={index}
            category={c}
            setCategories={setCategories}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
