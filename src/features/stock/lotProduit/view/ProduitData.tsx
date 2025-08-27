import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {CheckField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {selectAllStateItems, tableWhiteStyle} from "../../../../services/services.ts";
import {getProduitHeadItems} from "../../produit/model/produitService.ts";
import type {LotProduit} from "../model/lotProduitService.ts";
import ProduitItem from "./ProduitItem.tsx";

export default function ProduitData(props: {
  produits: LotProduit[]
  setProduits: Dispatch<SetStateAction<LotProduit[]>>
}) {
  
  const { produits, setProduits } = props
  
  const [search, setSearch] = useState<{ keyword: string }>({ keyword: '' })
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  
  return (
    <>
      <Row>
        <Col md={6}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button variant='link' size='sm' className='me-2'>
              <i className='bi bi-arrow-clockwise'/>
            </Button>
            Liste des produit
            
            <Link to='/app/produits/new' className='mx-5 btn btn-sm btn-link' title='Nouvel enregistrement'>
              <i className='bi bi-plus'/> Nouveau produit
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
                Rechercher des produits
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
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setProduits)}
              className='me-0'
            />
            Produit
          </th>
          
          {getProduitHeadItems().length > 0 && getProduitHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {produits.length > 0 && produits.map((c, index: number) =>
          <ProduitItem
            key={index}
            produit={c}
            setProduits={setProduits}
            index={index}
            isSelectedAll={isSelectedAll}
            setIsSelectedAll={setIsSelectedAll}
          />)}
        </tbody>
      </Table>
    </>
  )
  
}
