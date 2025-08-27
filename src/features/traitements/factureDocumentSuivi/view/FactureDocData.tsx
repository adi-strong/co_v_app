import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {getFactureHeadItems} from "../../../stock/factureProduit/model/factureProduitService.ts";
import {tableWhiteStyle} from "../../../../services/services.ts";
import type {FactureDocumentSuivi} from "../model/factureDocumentSuiviService.ts";
import FactureDocItem from "./FactureDocItem.tsx";

export default function FactureDocData({ factures }: { factures: FactureDocumentSuivi[] }) {
  
  const [search, setSearch] = useState<{ start: string, end: '', factId: string }>({
    end: '',
    factId: '',
    start: '',
  })
  
  return (
    <>
      <Row>
        <Col md={4}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button variant='link' size='sm' className='me-2'>
              <i className='bi bi-arrow-clockwise'/>
            </Button>
            Liste des factures
          </Card.Title>
        </Col>
        
        <Col md={8} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={2} className='mb-1'>
              <TextField
                disabled={false}
                size='sm'
                name='factId'
                value={search.factId}
                onChange={e => handleChange(e, search, setSearch)}
                placeholder='N° facture'
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
            
            <Col md={4} className='mb-1'>
              <Button type='submit' disabled={false} variant='outline-primary' className='w-100' size='sm'>
                Rechercher des factures
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
      
      <Table hover striped responsive>
        <thead className='table-light'>
        <tr>
          <th style={{fontSize: '1rem'}}>Patient<span className='text-lowercase'>(e)</span></th>
          {getFactureHeadItems().length > 0 && getFactureHeadItems().map(t =>
            <th key={t.th} style={{fontSize: '1rem'}}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {factures.length > 0 && factures.map((c, index: number) =>
          <FactureDocItem key={index} facture={c}/>)}
        </tbody>
      </Table>
    </>
  )
  
}
