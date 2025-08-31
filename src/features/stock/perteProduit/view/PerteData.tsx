import {useState} from "react";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {tableWhiteStyle} from "../../../../services/services.ts";
import type {PerteProduit} from "../model/perteProduitService.ts";
import {getPerteHeadItems} from "../model/perteProduitService.ts";
import PerteProdItem from "./PerteProdItem.tsx";

export default function PerteData({ pertes }: { pertes: PerteProduit[] }) {
  
  const [search, setSearch] = useState<{ start: string, end: '' }>({
    end: '',
    start: '',
  })
  
  return (
    <>
      <Row>
        <Col md={5}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button variant='link' size='sm' className='me-2'>
              <i className='bi bi-arrow-clockwise'/>
            </Button>
            Historique des pertes de produits
          </Card.Title>
        </Col>
        
        <Col md={7} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={4} className='mb-1'>
              <TextField
                disabled={false}
                type='date'
                size='sm'
                name='start'
                value={search.start}
                onChange={e => handleChange(e, search, setSearch)}
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
              />
            </Col>
            
            <Col md={4} className='mb-1'>
              <Button type='submit' disabled={false} variant='outline-primary' className='w-100' size='sm'>
                Rechercher
              </Button>
            </Col>
          </form>
        </Col>
      </Row>
      
      <Row className='px-6 pe-4 pb-4'>
        <Col md={6} className='mb-1'>
          <Button disabled={false} variant='outline-warning' size='sm' className='me-2'>
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
          <th className='p-1' style={{ fontSize: '0.8rem' }}>Produit</th>
          {getPerteHeadItems().length > 0 && getPerteHeadItems().map(t =>
            <th key={t.th} className='p-1 text-end' style={{ fontSize: '0.8rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {pertes.length > 0 && pertes.map(a =>
          <PerteProdItem key={a.id} perte={a} />)}
        </tbody>
      </Table>
    </>
  )
  
}
