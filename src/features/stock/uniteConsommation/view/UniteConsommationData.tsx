import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeDocSuivi} from "../../../traitements/typeDocSuivi/model/typeDocSuiviService.ts";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import UniteConsommationItem from "./UniteConsommationItem.tsx";

export default function UniteConsommationData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  unites: UniteConsommation[]
  setUnites: Dispatch<SetStateAction<UniteConsommation[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    unites,
    setUnites,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setUnites)}
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
        {unites.length > 0 && unites.map((c: TypeDocSuivi, index: number) =>
          <UniteConsommationItem
            key={index}
            unite={c}
            setUnites={setUnites}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
