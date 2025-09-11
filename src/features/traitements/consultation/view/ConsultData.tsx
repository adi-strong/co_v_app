import {ReactNode, useState} from "react";
import {Button, Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {tableWhiteStyle} from "../../../../services/services.ts";
import type {Consultation} from "../model/consultationService.ts";
import {getConsultHeadItems} from "../model/consultationService.ts";
import ConsultItem from "./ConsultItem.tsx";
import {RepeatableTableRows} from "../../../../loaders";

export default function ConsultData({ consultations, onRefresh, loader, isFetching }: {
  consultations: Consultation[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const [search, setSearch] = useState<{ start: string, end: '' }>({
    end: '',
    start: '',
  })
  
  return (
    <>
      <Row>
        <Col md={4}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            
            Liste de fiches
          </Card.Title>
        </Col>
        
        <Col md={8} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={4} className='mb-1'>
              <TextField
                disabled={false}
                type='date'
                size='sm'
                name='start'
                value={search.start}
                onChange={e => handleChange(e, search, setSearch)}
                placeholder='N° facture'
              />
            </Col>
            
            <Col md={4} className='mb-1'>
              <TextField
                disabled={false}
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
                Rechercher des fiches
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
          
          <Link to='/app/consultations/new' className='mx-2 btn btn-sm btn-link' title='Nouvel enregistrement'>
            <i className='bi bi-plus'/> Nouvelle fiche
          </Link>
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
          <th style={{ fontSize: '1rem' }}>
            Patient
            <span className='text-lowercase'>(e)</span>
          </th>
          
          {getConsultHeadItems().length > 0 && getConsultHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
          <th/>
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {consultations.length > 0 && consultations.map((c, index: number) =>
          <ConsultItem
            key={index}
            consultation={c}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
