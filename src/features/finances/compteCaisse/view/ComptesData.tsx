import {Table} from "react-bootstrap";
import type {Dispatch, SetStateAction} from "react";
import type {CompteCaisse} from "../model/compteCaisseService.ts";
import {getCompteHeadItems} from "../model/compteCaisseService.ts";
import {CheckField} from "../../../../components";
import {selectAllStateItems} from "../../../../services/services.ts";
import CompteItem from "./CompteItem.tsx";

export default function ComptesData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  comptes: CompteCaisse[]
  setComptes: Dispatch<SetStateAction<CompteCaisse[]>>
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    comptes,
    setComptes,
  } = props
  
  return (
    <>
      <Table hover responsive>
        <thead className='table-light'>
        <tr>
          <th style={{ fontSize: '1rem' }}>
            <CheckField
              inline
              disabled={false}
              name='isSelectedAll'
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setComptes)}
              value={isSelectedAll}
              checked={isSelectedAll}
              className='me-0'
            />
            Nom
          </th>
          
          {getCompteHeadItems().length > 0 && getCompteHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody>
        {comptes.length > 0 && comptes.map((c, index) =>
          <CompteItem
            key={index}
            compte={c}
            setComptes={setComptes}
            index={index}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
