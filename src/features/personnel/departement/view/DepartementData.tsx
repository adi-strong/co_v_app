import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeDocSuivi} from "../../../traitements/typeDocSuivi/model/typeDocSuiviService.ts";
import type {Departement} from "../model/departementService.ts";
import DepartementItem from "./DepartementItem.tsx";

export default function DepartementData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  departements: Departement[]
  setDepartements: Dispatch<SetStateAction<Departement[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    departements,
    setDepartements,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setDepartements)}
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
        {departements.length > 0 && departements.map((c: TypeDocSuivi, index: number) =>
          <DepartementItem
            key={index}
            departement={c}
            setDepartements={setDepartements}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
