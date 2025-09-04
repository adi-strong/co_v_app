import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../services/services.ts";
import type {RendezVous} from "../model/rendezVousService.ts";
import RdvItem from "./RdvItem.tsx";
import {getRdvHeadItems} from "../model/rendezVousService.ts";
import {RepeatableTableRows} from "../../../loaders";

export default function RdvData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  rdvs: RendezVous[]
  setRdvs: Dispatch<SetStateAction<RendezVous[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    rdvs,
    setRdvs,
    onRefresh,
    isFetching,
    loader,
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
            
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            
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
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
