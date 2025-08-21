import {IGTextField, TextField} from "../../../components";
import {Col, InputGroup, Row} from "react-bootstrap";
import {handleArrayChange} from "../../../services/form.handler.service";
import {ExpenseDesignation, ExpenseSaver, totalExpenseItem} from "../model/bonDeDepensesService";

type ExpenseDesignationProps = {
  item: ExpenseDesignation
  loader: boolean
  expense: ExpenseSaver
  setOrder: React.Dispatch<React.SetStateAction<ExpenseSaver>>
  index: number
}

export default function ExpenseItem({ item, loader, expense, setOrder, index }: ExpenseDesignationProps) {
  
  return (
    <>
      <Row>
        <Col md={3} className='mb-1'>
          <TextField
            required
            disabled
            name='libelle'
            onChange={(e): void => handleArrayChange(
              e,
              index,
              'designations',
              expense,
              setOrder
            )}
            value={item.libelle}
            placeholder='Libellé'
          />
        </Col>
        
        <Col md={3} className='mb-1'>
          <IGTextField
            disabled={loader}
            type='number'
            name='qte'
            onChange={(e): void => handleArrayChange(
              e,
              index,
              'designations',
              expense,
              setOrder
            )}
            value={item.qte}
            placeholder='Qté.'
            tBPosition='before'
            tBIcon={<InputGroup.Text>Nbr.</InputGroup.Text>}
          />
        </Col>
        
        <Col className='mb-1'>
          <IGTextField
            disabled={loader}
            type='number'
            name='prixUnitaire'
            onChange={(e): void => handleArrayChange(
              e,
              index,
              'designations',
              expense,
              setOrder
            )}
            value={item.prixUnitaire}
            placeholder='Prix Unitaire (USD)'
            tBPosition='after'
            tBIcon={(
              <InputGroup.Text>
                {'= '}
                {totalExpenseItem(item) + ' $'}
              </InputGroup.Text>
            )}
            tIPosition='before'
            tIcon='P.U'
          />
        </Col>
      </Row>
    </>
  )
  
}
