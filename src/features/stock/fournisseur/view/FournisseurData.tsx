import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {CheckField, SideContent, TextField} from "../../../../components";
import {handleChange} from "../../../../config/form.hander.service.ts";
import {handleShow, selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import type {Fournisseur} from "../model/fournisseurService.ts";
import FournisseurItem from "./FournisseurItem.tsx";
import {getFournisseurHeadItems} from "../model/fournisseurService.ts";
import FournisseurForm from "./FournisseurForm.tsx";

export default function FournisseurData(props: {
  fournisseur: Fournisseur[]
  setFournisseurs: Dispatch<SetStateAction<Fournisseur[]>>
}) {
  
  const { fournisseur, setFournisseurs } = props
  
  const [search, setSearch] = useState<{ keyword: string }>({ keyword: '' })
  const [show, setShow] = useState<boolean>(false)
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  
  return (
    <>
      <Row>
        <Col md={6}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button variant='link' size='sm' className='me-2'>
              <i className='bi bi-arrow-clockwise'/>
            </Button>
            Liste des fournisseurs
            
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
                Rechercher des fournisseurs
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setFournisseurs)}
              className='me-0'
            />
            Nom
          </th>
          
          {getFournisseurHeadItems().length > 0 && getFournisseurHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {fournisseur.length > 0 && fournisseur.map((c, index: number) =>
          <FournisseurItem
            key={index}
            fournisseur={c}
            setFournisseurs={setFournisseurs}
            index={index}
            isSelectedAll={isSelectedAll}
            setIsSelectedAll={setIsSelectedAll}
          />)}
        </tbody>
      </Table>
      
      <SideContent
        show={show}
        onHide={(): void => handleShow(setShow)}
        title='Nouveau fournisseur'
        icon='plus'
        onRefresh={(): void => { }}
        children={(<FournisseurForm/>) as ReactNode}
      />
    </>
  )
  
}
