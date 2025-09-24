import type {ExpenseError, ExpenseSaver} from "../model/bonDeDepensesService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import useGetExpensesTypesOptions from "../../typesDepenses/hooks/useGetExpensesTypesOptions.ts";
import {MultiSelectField, TextField} from "../../../../components";
import {handleChange} from "../../../../services/form.hander.service.ts";
import {Col, Row} from "react-bootstrap";
import {onExpTypeOptionChange, onSubExpTypeChange, totalExpenseAmount} from "../model/bonDeDepensesService.ts";
import PostExpenseItem from "./PostExpenseItem.tsx";
import {useSelector} from "react-redux";
import type {DeviseState} from "../../compteCaisse/model/devise.slice.ts";
import SelectField from "../../../../components/forms/SelectField.tsx";

export default function PostExpenseFields(props: {
  state: ExpenseSaver
  setState: Dispatch<SetStateAction<ExpenseSaver>>
  loader: boolean
  errors: ExpenseError
}) {
  
  const {
    state,
    setState,
    errors,
    loader,
  } = props
  
  const { devise } = useSelector((state: DeviseState) => state.devise)
  
  const [subTypesOptions, setSubTypesOptions] = useState<SelectOptionType[]>([])
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<SelectOptionType>>([])
  const [selectedSubTypes, setSelectedSubTypes] = useState<MultiValue<SelectOptionType>>([])
  
  const expensesTypesOptions = useGetExpensesTypesOptions()
  // const options = useMemo(() => expensesTypesOptions(), [expensesTypesOptions])
  
  return (
    <>
      <Row>
        <Col className='mb-2'>
          <SelectField
            required
            disabled={loader}
            label='Devise'
            name='devise'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.devise}
            options={devise ? devise.options : []}
            error={errors.devise}
          />
        </Col>
        
        <Col className='mb-2'>
          <TextField
            disabled={loader}
            type='datetime-local'
            label='Date'
            name='createdAt'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.createdAt}
          />
        </Col>
      </Row>
      
      <Row>
        <Col className='mb-2'>
          <TextField
            required
            autoFocus
            disabled={loader}
            label='Objet:'
            name='objet'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.objet}
            placeholder='...'
            error={errors.objet}
          />
        </Col>
        
        <Col className='mb-2'>
          <TextField
            disabled={loader}
            label='Demandeur'
            name='demandeur'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.demandeur}
            error={errors.demandeur}
          />
        </Col>
      </Row>
      
      <div className='mb-2'>
        <MultiSelectField
          required
          disabled={loader}
          options={expensesTypesOptions()}
          value={selectedOptions}
          onChange={(e) => onExpTypeOptionChange(
            e,
            selectedSubTypes,
            setSelectedOptions,
            setSubTypesOptions,
            setSelectedSubTypes
          )}
          placeholder='Choississez un plusieurs types...'
          name='selectedOptions'
          label='Types de dépense'
        />
      </div>
      
      <div className='mb-3'>
        <MultiSelectField
          required
          disabled={loader}
          options={subTypesOptions}
          value={selectedSubTypes}
          onChange={(e) => onSubExpTypeChange(e, setSelectedSubTypes, setState)}
          name='selectedSubTypes'
          label='Sous-types'
          placeholder='Choississez un plusieurs sous-types...'
        />
      </div>
      
      <div className='bg-light p-2' style={{ borderRadius: 4 }}>
        {state.designations.length > 0 && state.designations.map((d, i) =>
          <PostExpenseItem
            key={i}
            item={d}
            loader={loader}
            expense={state}
            setExpense={setState}
            index={i}
          />)}
        
        <div className='border-dashed border-1 p-2 mb-3 d-flex justify-content-between fw-bold'>
          <span>TOTAL</span>
          <span>{totalExpenseAmount(state.designations)} ({state?.devise ?? '—'})</span>
        </div>
      </div>
    </>
  )
  
}
