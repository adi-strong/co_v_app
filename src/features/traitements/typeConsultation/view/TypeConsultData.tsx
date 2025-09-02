import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {TypeConsultation} from "../model/typeConsultationService.ts";
import TypeConsultItem from "./TypeConsultItem.tsx";
import {getTypeConsultTheadItems} from "../model/typeConsultationService.ts";
import {RepeatableTableRows} from "../../../../loaders";

export default function TypeConsultData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  typesConsults: TypeConsultation[]
  setTypesConsults: Dispatch<SetStateAction<TypeConsultation[]>>
  loader: boolean
  isFetching: boolean
  onRefresh: () => void
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    typesConsults,
    setTypesConsults,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setTypesConsults)}
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
          {getTypeConsultTheadItems().length > 0 && getTypeConsultTheadItems().map((t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>
              {t.th}
            </th>))}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {typesConsults.length > 0 && typesConsults.map((c: TypeConsultation, index: number) =>
          <TypeConsultItem
            key={index}
            typeConsult={c}
            setTypesConsults={setTypesConsults}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
