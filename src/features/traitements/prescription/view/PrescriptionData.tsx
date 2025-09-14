import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import {Button, Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import {CheckField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import type {Prescription} from "../model/prescriptionService.ts";
import {getPrescHeadItems} from "../model/prescriptionService.ts";
import {RepeatableTableRows} from "../../../../loaders";
import PrescriptionItem from "./PrescriptionItem.tsx";

export default function PrescriptionData(props: {
  prescriptions: Prescription[]
  setPrescriptions: Dispatch<SetStateAction<Prescription[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [search, setSearch] = useState<{ start: string, end: '', factId: string }>({
    end: '',
    factId: '',
    start: '',
  })
  
  const {
    prescriptions,
    onRefresh,
    loader,
    isFetching,
    setPrescriptions,
  } = props
  
  return (
    <>
      <Row>
        <Col md={3}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            
            Liste d'ordonnances
          </Card.Title>
        </Col>
        
        <Col md={9} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={2} className='mb-1'>
              <TextField
                disabled={loader}
                size='sm'
                name='factId'
                value={search.factId}
                onChange={e => handleChange(e, search, setSearch)}
                placeholder='N° prescription'
              />
            </Col>
            
            <Col md={3} className='mb-1'>
              <TextField
                disabled={loader}
                type='date'
                size='sm'
                name='start'
                value={search.start}
                onChange={e => handleChange(e, search, setSearch)}
                placeholder='N° facture'
              />
            </Col>
            
            <Col md={3} className='mb-1'>
              <TextField
                disabled={loader}
                type='date'
                size='sm'
                name='end'
                value={search.end}
                onChange={e => handleChange(e, search, setSearch)}
                placeholder='N° facture'
              />
            </Col>
            
            <Col md={4} className='mb-1'>
              <Button type='submit' disabled={false} variant='outline-primary' className='w-100' size='sm'>
                Rechercher des ordonnances
              </Button>
            </Col>
          </form>
        </Col>
      </Row>
      
      <Row className='px-6 pe-4 pb-4'>
        <Col md={6} className='mb-1'>
          <Button disabled={false} variant='outline-warning' size='sm' className='me-1'>
            <i className='bi bi-file-earmark-pdf me-1'/>
            Imprimer en pdf
          </Button>
        </Col>
        
        <Col md={6} className='mb-1 text-md-end'>
          <Button disabled={false} variant='outline-success' size='sm'>
            <i className='bi bi-file-earmark-excel me-1'/>
            Exporter en excel
          </Button>
        </Col>
      </Row>
      
      <Table hover responsive>
        <thead className='table-light'>
        <tr>
          <th style={{fontSize: '1rem'}}>
            <CheckField
              inline
              disabled={false}
              name='isSelectedAll'
              value={isSelectedAll}
              checked={isSelectedAll}
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setPrescriptions)}
              className='me-0'
            />
            N°
          </th>
          <th style={{fontSize: '1rem'}}>
            Patient
            <span className='text-lowercase'>(e)</span>
          </th>
          {getPrescHeadItems().length > 0 && getPrescHeadItems().map(t =>
            <th key={t.th} style={{fontSize: '1rem'}}>{t.th}</th>)}
          <th/>
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {prescriptions.length > 0 && prescriptions.map((c, index: number) =>
          <PrescriptionItem
            key={index}
            prescription={c}
            index={index}
            onRefresh={onRefresh}
            setPrescription={setPrescriptions}
          />) }
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
