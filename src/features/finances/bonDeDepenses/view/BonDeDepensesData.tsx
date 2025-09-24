import type {ReactNode} from "react";
import {useState} from "react";
import {Button, Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {handleShow, tableWhiteStyle} from "../../../../services/services.ts";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {RepeatableTableRows} from "../../../../loaders";
import type {BonDeDepense} from "../model/bonDeDepensesService.ts";
import BonDeDepenseItem from "./BonDeDepenseItem.tsx";
import PostNewExpenseModal from "./PostNewExpenseModal.tsx";
import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../../compteCaisse/model/compteCaisse.slice.ts";

export default function BonDeDepensesData(props: {
  expenses: BonDeDepense[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const {
    expenses,
    onRefresh,
    loader,
    isFetching,
  } = props
  
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  
  const [search, setSearch] = useState<{ keyword: string }>({ keyword: '' })
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <>
      <Row>
        <Col md={6}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button disabled={isFetching} variant='link' className='me-1' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            Liste des bons
            
            <Button variant='link' className='mx-5' title='Nouveau fournisseur' onClick={(): void => handleShow(setShow)}>
              <i className='bi bi-plus'/> Nouveau
            </Button>
          </Card.Title>
        </Col>
        
        <Col md={6} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={7} className='mb-1'>
              <TextField
                disabled={false}
                size='sm'
                name='keyword'
                value={search.keyword}
                onChange={e => handleChange(e, search, setSearch)}
              />
            </Col>
            
            <Col md={5} className='mb-1'>
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
          <th style={{ fontSize: '1rem' }}>Objet</th>
          <th style={{ fontSize: '1rem' }}>Demandeur</th>
          <th style={{ fontSize: '1rem' }}>Taux</th>
          <th style={{ fontSize: '1rem' }}>Montant {compte && `(${compte.first.code})`}</th>
          <th style={{ fontSize: '1rem' }}>Montant {compte && `(${compte.last.code})`}</th>
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {expenses.length > 0 && expenses.map((c, index: number) =>
          <BonDeDepenseItem key={index} expense={c} />)}
        </tbody>
      </Table>
      
      <PostNewExpenseModal show={show} onHide={(): void => handleShow(setShow)} onRefresh={onRefresh} />
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
