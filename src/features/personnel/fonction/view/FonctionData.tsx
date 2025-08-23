import type {Dispatch, SetStateAction} from "react";
import type {TypeDocSuivi} from "../../../traitements/typeDocSuivi/model/typeDocSuiviService.ts";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Fonction} from "../model/fonctionService.ts";
import FonctionItem from "./FonctionItem.tsx";

export default function FonctionData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  fonctions: Fonction[]
  setFonctions: Dispatch<SetStateAction<Fonction[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    fonctions,
    setFonctions,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setFonctions)}
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
        {fonctions.length > 0 && fonctions.map((c: TypeDocSuivi, index: number) =>
          <FonctionItem
            key={index}
            fonction={c}
            setFonctions={setFonctions}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
