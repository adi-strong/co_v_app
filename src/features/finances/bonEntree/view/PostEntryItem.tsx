import type {Dispatch, SetStateAction} from "react";
import {Col, Form, InputGroup, Row} from "react-bootstrap";
import {TextField} from "../../../../components";
import {handleSubItemToTheItemArrayChange} from "../../../../services/form.hander.service.ts";
import {totalExpenseItem} from "../../bonDeDepenses/model/bonDeDepensesService.ts";
import type {DesignationBonEntreeItem, SaveBonEntree} from "../model/bonEntreeService.ts";

export default function PostEntryItem(props: {
  item: DesignationBonEntreeItem
  loader: boolean
  entry: SaveBonEntree
  setEntry: Dispatch<SetStateAction<SaveBonEntree>>
  index: number
}) {
  
  const { item, loader, entry, index, setEntry } = props
  
  return (
    <>
      <Row>
        <Col md={4} className='mb-1'>
          <TextField
            required
            autoFocus
            disabled={loader}
            name='libelle'
            onChange={(e): void => handleSubItemToTheItemArrayChange(
              e,
              index,
              setEntry,
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
                setEntry,
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
                setEntry,
                'designations'
              )}
              value={item.prixUnitaire}
              placeholder={`Prix Unitaire ${entry?.devise ?? '—'}`}
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
