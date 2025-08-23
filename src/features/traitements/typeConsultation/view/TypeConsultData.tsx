import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import TypeConsultItem from "./TypeConsultItem.tsx";

export default function TypeConsultData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  typesConsults: TypeConsultation[]
  setTypesConsults: Dispatch<SetStateAction<TypeConsultation[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    typesConsults,
    setTypesConsults,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setTypesConsults)}
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
        {typesConsults.length > 0 && typesConsults.map((c: TypeConsultation, index: number) =>
          <TypeConsultItem
            key={index}
            typeConsult={c}
            setTypesConsults={setTypesConsults}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
