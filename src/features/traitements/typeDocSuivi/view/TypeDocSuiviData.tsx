import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeDocSuivi} from "../model/typeDocSuiviService.ts";
import TypeDocSuiviItem from "./TypeDocSuiviItem.tsx";

export default function TypeDocSuiviData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  typesDocs: TypeDocSuivi[]
  setTypesDocs: Dispatch<SetStateAction<TypeDocSuivi[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    typesDocs,
    setTypesDocs,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setTypesDocs)}
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
        {typesDocs.length > 0 && typesDocs.map((c: TypeDocSuivi, index: number) =>
          <TypeDocSuiviItem
            key={index}
            typeDocSuivi={c}
            setTypesDocsSuivi={setTypesDocs}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
