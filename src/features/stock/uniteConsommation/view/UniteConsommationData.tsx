import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeDocSuivi} from "../../../traitements/typeDocSuivi/model/typeDocSuiviService.ts";
import type {UniteConsommation} from "../model/uniteConsommationService.ts";
import UniteConsommationItem from "./UniteConsommationItem.tsx";
import {RepeatableTableRows} from "../../../../loaders";

export default function UniteConsommationData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  unites: UniteConsommation[]
  setUnites: Dispatch<SetStateAction<UniteConsommation[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    unites,
    setUnites,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setUnites)}
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
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
