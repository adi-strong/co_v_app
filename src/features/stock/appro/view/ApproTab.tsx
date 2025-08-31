import {Button, Card, Col, Row, Table} from "react-bootstrap";
import type {ApproProductItem, SaveAppro} from "../model/approService.ts";
import type {Dispatch, SetStateAction} from "react";
import {TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {formatDecimalNumberWithSpaces, formatNumberWithSpaces, handleShow} from "../../../../services/services.ts";
import {useState} from "react";
import ConfirmApproForm from "./ConfirmApproForm.tsx";
import {onApproRemoveProduct, onApproReset} from "../model/approService.ts";
import type {BaseTaxeInt} from "../../../../interfaces/BaseTaxeInt.ts";
import useGetApproSubTotal from "../hooks/useGetApproSubTotal.ts";
import useGetApproTaxTotal from "../hooks/useGetApproTaxTotal.ts";
import useGetApproTotalAmount from "../hooks/useGetApproTotalAmount.ts";
import moment from "moment";

const ApproTabItem = (props: {
  product: ApproProductItem
  index: number
  products: ApproProductItem[]
  taxes: BaseTaxeInt[]
  setState: Dispatch<SetStateAction<SaveAppro>>
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>
}) => {
  
  const {
    nom,
    quantite,
    unite,
    qty,
    prixHt,
    price,
    tva,
    datePeremption,
  } = props.product
  
  const { index, products, setState, taxes, setTaxes } = props
  
  const quantity: number = qty ?? quantite
  const unitPrice: number = price ?? prixHt
  const total: number = unitPrice * quantity
  
  return (
    <>
      <tr>
        <td>
          <Button
            variant='link'
            className='text-danger p-0 me-1'
            onClick={(): void => onApproRemoveProduct(index, products, setState, setTaxes, tva)}
          ><i className='bi bi-trash3'/></Button>
          {nom}
        </td>
        <td className='text-capitalize'>
          {datePeremption ? `le ${moment(datePeremption).format('DD MMMM / YY')}` : '—'}</td>
        <td>{formatNumberWithSpaces(quantity)}</td>
        <td className='text-center text-capitalize'>{unite}</td>
        
        <td className='text-end'>{formatDecimalNumberWithSpaces(unitPrice.toFixed(2))}</td>
        <td className='text-end'>{formatDecimalNumberWithSpaces(total.toFixed(2))}</td>
      </tr>
    </>
  )
  
}

export default function ApproTab({ state, setState, taxes = [], setTaxes }: {
  state: SaveAppro
  taxes: BaseTaxeInt[]
  setState: Dispatch<SetStateAction<SaveAppro>>
  setTaxes: Dispatch<SetStateAction<BaseTaxeInt[]>>
}) {
  
  const [show, setShow] = useState<boolean>(false)
  
  const { productItems, remise } = state
  
  const subTotal = useGetApproSubTotal(state.productItems, state.remise)
  const taxesAmount = useGetApproTaxTotal(taxes)
  const totalAmount = useGetApproTotalAmount(subTotal(), taxesAmount())
  
  return (
    <>
      <Table hover responsive>
        <thead className='table-light'>
        <tr>
          <th className='text-start'>
            <Button
              variant='link'
              size='sm'
              className='me-1 p-0'
              title='Tout effacer'
              onClick={(): void => onApproReset(setState, setTaxes)}
            >
              <i className='text-danger bi bi-trash-fill'/>
            </Button>
            Produit
          </th>
          <th>Péremption</th>
          <th>Qté</th>
          <th className='text-center'>U.C</th>
          <th className='text-end'>P.U ({state.devise})</th>
          <th className='text-end'>Total HT ({state.devise})</th>
        </tr>
        </thead>
        
        <tbody>
        {productItems.length > 0 && productItems.map((p, index) => (
          <ApproTabItem
            key={index}
            product={p}
            products={productItems}
            index={index}
            setState={setState}
            taxes={taxes}
            setTaxes={setTaxes}
          />
        ))}
        </tbody>
      </Table>
      
      <Card.Body>
        <Row>
          <Col md={6} className='mb-3' style={{ paddingTop: 30 }}>
            <Table responsive striped bordered>
              <thead>
              <tr>
                <th className='text-center'>Base HT</th>
                <th className='text-center'>% TVA</th>
                <th className='text-center'>Montant TVA</th>
              </tr>
              </thead>
              
              <tbody>
              {taxes.length > 0 && taxes.map((tax, index) => (
                <tr key={index}>
                  <td className='text-center'>{formatDecimalNumberWithSpaces(tax.baseHT.toFixed(2))}</td>
                  <td className='text-center'>{tax.tva}</td>
                  <td className='text-center'>{formatDecimalNumberWithSpaces(tax.amount.toFixed(2))}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
          
          <Col md={6} className='mb-3'>
            <div className='mb-3'>
              <TextField
                disabled={false}
                type='number'
                name='remise'
                onChange={(e): void => handleChange(e, state, setState)}
                value={remise}
                label='Remise (%)'
                className='border-radius-0'
              />
            </div>
            
            <Table responsive bordered striped>
              <tbody>
              <tr>
                <th>Sous-total HT</th>
                <th className='text-end'>
                  {formatDecimalNumberWithSpaces(subTotal().toFixed(2))} ({state.devise})
                </th>
              </tr>
              
              <tr>
                <th>TVA</th>
                <th className='text-end'>
                  {formatDecimalNumberWithSpaces(taxesAmount().toFixed(2))} ({state.devise})
                </th>
              </tr>
              
              <tr>
                <th>Total TTC</th>
                <th className='text-end'>
                  {formatDecimalNumberWithSpaces(totalAmount().toFixed(2))} ({state.devise})
                </th>
              </tr>
              </tbody>
            </Table>
            
            <Button className='mt-3 w-100' onClick={(): void => handleShow(setShow)}>
              Approvisionner
            </Button>
          </Col>
        </Row>
      </Card.Body>
      
      <ConfirmApproForm show={show} onHide={(): void => handleShow(setShow)} state={state} />
    </>
  )
  
}
