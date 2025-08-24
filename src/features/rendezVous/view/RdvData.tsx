import type {Dispatch, SetStateAction} from "react";
import {Table} from "react-bootstrap";
import {CheckField} from "../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../services/services.ts";
import type {RendezVous} from "../model/rendezVousService.ts";
import RdvItem from "./RdvItem.tsx";
import {getRdvHeadItems} from "../model/rendezVousService.ts";

export default function RdvData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  rdvs: RendezVous[]
  setRdvs: Dispatch<SetStateAction<RendezVous[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    rdvs,
    setRdvs,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setRdvs)}
              value={isSelectedAll}
              checked={isSelectedAll}
              className='me-0'
            />
            Nom complet
          </th>
          {getRdvHeadItems().length > 0 && getRdvHeadItems().map(t =>
            <th key={t.th}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {rdvs.length > 0 && rdvs.map((c, index: number) =>
          <RdvItem
            key={index}
            rdv={c}
            setRdvs={setRdvs}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
