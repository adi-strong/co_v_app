import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {Button, Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {CheckField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Patient} from "../model/patientService.ts";
import PatientItem from "./PatientItem.tsx";
import {getPatientHeadItems} from "../model/patientService.ts";
import {RepeatableTableRows} from "../../../../loaders";

export default function PatientData(props: {
  patients: Patient[]
  setPatients: Dispatch<SetStateAction<Patient[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  const { patients, setPatients, onRefresh, loader, isFetching} = props
  
  const [search, setSearch] = useState<{ keyword: string }>({ keyword: '' })
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  
  return (
    <>
      <Row>
        <Col md={6}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button disabled={isFetching} variant='link' className='me-2' size='sm' onClick={onRefresh} title='Actualiser'>
              {!isFetching && (<i className='bi bi-arrow-clockwise' />) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            Liste des patients
            
            <Link to='/app/patients/new' className='mx-5 btn btn-sm btn-link' title='Nouvel enregistrement'>
              <i className='bi bi-plus'/> Nouveau
            </Link>
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
                Rechercher des patients
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
          <th style={{ fontSize: '1rem' }}>
            <CheckField
              inline
              disabled={false}
              name='isSelectedAll'
              value={isSelectedAll}
              checked={isSelectedAll}
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setPatients)}
              className='me-0'
            />
            Nom complet
          </th>
          
          {getPatientHeadItems().length > 0 && getPatientHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {patients.length > 0 && patients.map((c, index: number) =>
          <PatientItem
            key={index}
            patient={c}
            setPatients={setPatients}
            index={index}
            onRefresh={onRefresh}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
