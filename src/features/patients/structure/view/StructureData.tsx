import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Structure} from "../model/structureService.ts";
import StructureItem from "./StructureItem.tsx";
import {getStructureHeadItems} from "../model/structureService.ts";
import {RepeatableTableRows} from "../../../../loaders";

export default function StructureData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  structure: Structure[]
  setStructures: Dispatch<SetStateAction<Structure[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    structure,
    setStructures,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setStructures)}
              value={isSelectedAll}
              checked={isSelectedAll}
              className='me-0'
            />
            
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            
            Nom
          </th>
          {getStructureHeadItems().length > 0 && getStructureHeadItems().map(t =>
            <th key={t.th}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {structure.length > 0 && structure.map((c: Structure, index: number) =>
          <StructureItem
            key={index}
            structure={c}
            setStructures={setStructures}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
