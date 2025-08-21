import {Alert, Col, Row} from "react-bootstrap";
import {getErrorMessage} from "../../../services";
import {TextField} from "../../../components";
import {handleChange} from "../../../services/form.handler.service";
import {
  Expense,
  ExpenseError,
  ExpenseSaver,
  onExpTypeOptionChange, onSubExpTypeChange,
  totalExpenseAmount
} from "../model/bonDeDepensesService";
import useExistingExpense from "../../../hooks/useExistingExpense";
import ExpenseItem from "./ExpenseItem";
import {SelectOptionType, SubDataType} from "../../../interfaces/SelectFieldInterface";
import {useMemo, useState} from "react";
import {MultiValue} from "react-select";
import AwaitMultipleSelectField from "../../../components/forms/AwaitMultipleSelectField";
import {useGetExpensesTypesOptions, useSetExpenseDesignations} from "../../../hooks";
import useSetExpenseDesignationsWithIds from "../../../hooks/useSetExpenseDesignationsWithIds";

type ExpenseProps = {
  isLoading: boolean
  isError: boolean
  error: any
  data?: Expense | undefined | null
  state: ExpenseSaver
  setState: React.Dispatch<React.SetStateAction<ExpenseSaver>>
  errorState: ExpenseError
}

export default function ExpenseForm(
  {
    data,
    state,
    isError,
    error,
    setState,
    isLoading,
    errorState,
  }: ExpenseProps) {
  
  const [subTypesOptions, setSubTypesOptions] =
    useState<SubDataType[]>([])
  
  const [selectedSubTypes, setSelectedSubTypes] =
    useState<MultiValue<SelectOptionType>>([])
  
  const [selectedOptions, setSelectedOptions] =
    useState<MultiValue<SelectOptionType>>([])
  
  const expensesTypesOptions = useGetExpensesTypesOptions()
  const options = useMemo(() => expensesTypesOptions(), [expensesTypesOptions])
  
  useExistingExpense(
    data,
    setState,
    setSelectedSubTypes,
    options,
    setSelectedOptions
  )
  
  useSetExpenseDesignations(data, setState, selectedSubTypes)
  
  useSetExpenseDesignationsWithIds(
    data,
    setState,
    setSelectedSubTypes,
    options,
    setSelectedOptions,
    setSubTypesOptions
  )
  
  return (
    <>
      
      {isError && (
        <div className='mt-3'>
          <Alert variant='danger' className='text-center' dismissible>
            {getErrorMessage(error)}
          </Alert>
        </div>
      )}
      
      <div className='mb-2'>
        <TextField
          disabled={isLoading}
          type='datetime-local'
          label='Date'
          name='createdAt'
          onChange={(e): void => handleChange(e, state, setState)}
          value={state.createdAt}
        />
      </div>
      
      <Row>
        <Col className='mb-2'>
          <TextField
            required
            autoFocus
            disabled={isLoading}
            label='Objet:'
            name='objet'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.objet}
            placeholder='...'
            error={errorState.objet}
          />
        </Col>
        
        <Col className='mb-2'>
          <TextField
            disabled={isLoading}
            label='Demandeur'
            name='demandeur'
            onChange={(e): void => handleChange(e, state, setState)}
            value={state.demandeur}
            error={errorState.demandeur}
          />
        </Col>
      </Row>
      
      <div className='mb-2'>
        <AwaitMultipleSelectField
          required
          disabled={isLoading}
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
        <AwaitMultipleSelectField
          required
          disabled={isLoading}
          options={subTypesOptions}
          value={selectedSubTypes}
          onChange={(e) => onSubExpTypeChange(e, setSelectedSubTypes, setState)}
          name='selectedSubTypes'
          label='Sous-types'
          placeholder='Choississez un plusieurs sous-types...'
        />
      </div>
      
      <div className='bg-light p-2' style={{borderRadius: 4}}>
        {state.designations.length > 0 && state.designations.map((d, i) =>
          <ExpenseItem
            key={i}
            item={d}
            loader={isLoading}
            expense={state}
            setOrder={setState}
            index={i}
          />)}
        
        <div className='border-dashed border-1 p-2 mb-3 d-flex justify-content-between fw-bold'>
          <span>TOTAL</span>
          <span>{totalExpenseAmount(state.designations)} (USD)</span>
        </div>
      </div>
    
    </>
  )
  
}
