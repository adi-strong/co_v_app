import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeDocSuivi} from "../../../traitements/typeDocSuivi/model/typeDocSuiviService.ts";
import type {CategorieProduit} from "../model/categorieProduitService.ts";
import CategorieProduitItem from "./CategorieProduitItem.tsx";

export default function CategorieProduitData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  categories: CategorieProduit[]
  setCategories: Dispatch<SetStateAction<CategorieProduit[]>>
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
        {categories.length > 0 && categories.map((c: TypeDocSuivi, index: number) =>
          <CategorieProduitItem
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
