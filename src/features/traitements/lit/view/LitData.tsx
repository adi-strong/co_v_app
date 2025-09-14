import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Lit} from "../model/litService.ts";
import LitItem from "./LitItem.tsx";
import {getLitHeadItems} from "../model/litService.ts";
import {RepeatableTableRows} from "../../../../loaders";

export default function LitData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  lits: Lit[]
  setLits: Dispatch<SetStateAction<Lit[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    lits,
    setLits,
    onRefresh,
    loader,
    isFetching,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setLits)}
              value={isSelectedAll}
              checked={isSelectedAll}
              className='me-0'
            />
            
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            
            Désignation
          </th>
          {getLitHeadItems().length > 0 && getLitHeadItems().map(t =>
            <th key={t.th}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {lits.length > 0 && lits.map((c: Lit, index: number) =>
          <LitItem
            key={index}
            lit={c}
            setLits={setLits}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
