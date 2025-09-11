import type {Dispatch, ReactNode, SetStateAction} from "react";
import {Button, Spinner, Table} from "react-bootstrap";
import {CheckField} from "../../../../components";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import {getExamHeadItems} from "../../examen/model/examenService.ts";
import {RepeatableTableRows} from "../../../../loaders";
import type {Traitement} from "../model/traitementService.ts";
import TreatmentItem from "./TreatmentItem.tsx";

export default function TraitementData(props: {
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  treatments: Traitement[]
  setTreatments: Dispatch<SetStateAction<Traitement[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    isSelectedAll,
    setIsSelectedAll,
    treatments,
    setTreatments,
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setTreatments)}
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
          
          {getExamHeadItems().length > 0 && getExamHeadItems().map(t => (
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>
          ))}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {treatments.length > 0 && treatments.map((c, index: number) =>
          <TreatmentItem
            key={index}
            traitement={c}
            setTraitements={setTreatments}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
