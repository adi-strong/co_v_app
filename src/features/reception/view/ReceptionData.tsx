import {ReactNode, useState} from "react";
import {Button, Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {tableWhiteStyle} from "../../../services/services.ts";
import {TextField} from "../../../components";
import {handleChange} from "../../../services/form.hander.service.ts";
import ReceptionItem from "./ReceptionItem.tsx";
import type {Reception} from "../model/receptionService.ts";
import {Link} from "react-router-dom";
import {getReceptionHeadItems} from "../model/receptionService.ts";
import {RepeatableTableRows} from "../../../loaders";

export default function ReceptionData({ receptions, loader, isFetching, onRefresh }: {
  receptions: Reception[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const [search, setSearch] = useState<{ start: string, end: '', nomComplet: string }>({
    end: '',
    nomComplet: '',
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
            
            Liste de présences / Fiche de réception
            
            <Link to='/app/receptions/new' className='mx-5 btn btn-sm btn-link' title='Nouvel enregistrement'>
              <i className='bi bi-plus'/> Nouvelle présence
            </Link>
          </Card.Title>
        </Col>
        
        <Col md={8} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={3} className='mb-1'>
              <TextField
                disabled={false}
                size='sm'
                name='nomComplet'
                value={search.nomComplet}
                onChange={e => handleChange(e, search, setSearch)}
                placeholder='Nom...'
              />
            </Col>
            
            <Col md={3} className='mb-1'>
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
            
            <Col md={3} className='mb-1'>
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
            
            <Col md={3} className='mb-1'>
              <Button type='submit' disabled={false} variant='outline-primary' className='w-100' size='sm'>
                Rechercher
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
          {getReceptionHeadItems().length > 0 && getReceptionHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {receptions.length > 0 && receptions.map((c, index: number) =>
          <ReceptionItem
            key={index}
            reception={c}
            index={index}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
