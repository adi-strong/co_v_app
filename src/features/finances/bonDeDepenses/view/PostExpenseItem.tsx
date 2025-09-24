import type {ExpenseDesignation, ExpenseSaver} from "../model/bonDeDepensesService.ts";
import type {Dispatch, SetStateAction} from "react";
import {Col, Form, InputGroup, Row} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleSubItemToTheItemArrayChange} from "../../../../services/form.hander.service.ts";
import {totalExpenseItem} from "../model/bonDeDepensesService.ts";

export default function PostExpenseItem(props: {
  item: ExpenseDesignation
  loader: boolean
  expense: ExpenseSaver
  setExpense: Dispatch<SetStateAction<ExpenseSaver>>
  index: number
}) {
  
  const { item, loader, expense, index, setExpense } = props
  
  return (
    <>
      <Row>
        <Col md={4} className='mb-1'>
          <TextField
            required
            disabled
            name='libelle'
            onChange={(e): void => handleSubItemToTheItemArrayChange(
              e,
              index,
              setExpense,
              'designations'
            )}
            value={item.libelle}
            placeholder='Libellé'
          />
        </Col>
        
        <Col md={4} className='mb-1'>
          <InputGroup>
            <InputGroup.Text>Nbr.</InputGroup.Text>
            <Form.Control
              disabled={loader}
              type='number'
              name='qte'
              onChange={(e): void => handleSubItemToTheItemArrayChange(
                e,
                index,
                setExpense,
                'designations'
              )}
              value={item.qte}
              placeholder='Qté.'
            />
          </InputGroup>
        </Col>
        
        <Col md={4} className='mb-1'>
          <InputGroup>
            <InputGroup.Text>P.U</InputGroup.Text>
            <Form.Control
              disabled={loader}
              type='number'
              name='prixUnitaire'
              onChange={(e): void => handleSubItemToTheItemArrayChange(
                e,
                index,
                setExpense,
                'designations'
              )}
              value={item.prixUnitaire}
              placeholder={`Prix Unitaire ${expense?.devise ?? '—'}`}
            />
            
            <InputGroup.Text>
              {'= '}
              {totalExpenseItem(item) + ' $'}
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </>
  )

}
