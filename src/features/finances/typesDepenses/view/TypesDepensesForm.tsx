import {Alert, Button, InputGroup, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
  ExpenseType, ExpenseErrorState, initExpenseTypeErrorState,
  initSousTypesState,
  initTypeDepState, onTypeSubmit,
  TDSousTypes,
  TSousType
} from "../model/typesDepensesService";
import {IGTextField, TextField} from "../../../components";
import {
  handleAddArrayItem,
  handleArrayChange,
  handleChange,
  handleRemoveArrayItem
} from "../../../services/form.handler.service";
import {useEditExpenseTypeMutation, usePostExpenseTypeMutation} from "../model/typesDepenses.api.slice";
import {getErrorMessage} from "../../../services";

type TDepType = {
  index: number
  sousType: TSousType
  sousTypes: TDSousTypes
  setSousTypes: React.Dispatch<React.SetStateAction<any>>,
  onRemoveClick?: () => void,
  isLoading: boolean,
  onChange?: (
    e: React.FormEvent,
    index: any,
    itemName: string,
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => void
}

const SousTypeFieldItem = (
  {
    index,
    sousType,
    onChange,
    sousTypes,
    setSousTypes,
    onRemoveClick,
    isLoading
  }: TDepType) => {
  
  return (
    <>
      <IGTextField
        required
        autoFocus
        disabled={isLoading}
        name='nom'
        value={sousType.nom}
        onChange={e => onChange
          ? onChange(e, index, 'sousTypes', sousTypes, setSousTypes)
          : { }}
        placeholder='Désignation du sous-type...'
        tBPosition='after'
        tBIcon={(
          <>
            <Button
              type='button'
              variant='danger'
              disabled={isLoading}
              onClick={onRemoveClick}> <i className='bi bi-dash' /> </Button>
          </>
        )}
      />
    </>
  )
  
}

export default function TypesDepensesForm({ data, onHide, onRefresh }: {
  onHide: () => void, onRefresh: () => void, data?: ExpenseType | undefined
}) {
  
  const [type, setType] = useState<ExpenseType>(data || initTypeDepState())
  const [sousTypes, setSousTypes] = useState<TDSousTypes>(initSousTypesState())
  
  const [errorState, setErrorState] = useState<ExpenseErrorState>(initExpenseTypeErrorState())
  
  const [postExpenseType, {
    isLoading,
    isError,
    error
  }] = usePostExpenseTypeMutation()
  
  const [editExpenseType, {
    isLoading: isEditLoading,
    isError: isEditError,
    error: editError
  }] = useEditExpenseTypeMutation()
  
  const onResetItems = (): void => {
    setType(initTypeDepState())
    setSousTypes(initSousTypesState())
  }
  
  useEffect(() => {
    if (data && data.sousTypeDepenses && data.sousTypeDepenses.length > 0) {
      setSousTypes({ sousTypes: data.sousTypeDepenses });
    }
  }, [data])
  
  return (
    <>
      <form onSubmit={async (e): Promise<void> => await onTypeSubmit(
        e,
        type,
        sousTypes,
        errorState,
        setErrorState,
        data ? editExpenseType : postExpenseType,
        onHide,
        onRefresh
      )}>
        
        {(isEditError || isError) && (
          <div className='mb-3'>
            <Alert variant='danger' className='text-center' dismissible>
              <i className='bi bi-exclamation-triangle-fill'/> {getErrorMessage(isError ? error : editError)}.
            </Alert>
          </div>
        )}
        
        <TextField
          required
          name='nom'
          disabled={isLoading || isEditLoading}
          value={type.nom}
          placeholder='Nom du Type...'
          onChange={e => handleChange(e, type, setType)}
          label='Désignation du Type'
          className='mb-3'
          error={errorState.nom}
        />
        
        <div className='bg-light px-3 pe-3 pt-3 pb-3' style={{ borderRadius: '9px' }}>
          <h5>Sous-Types :</h5> <hr/>
          
          {sousTypes.sousTypes.map((s, i) =>
            <SousTypeFieldItem
              key={i}
              index={i}
              sousType={s}
              sousTypes={sousTypes}
              setSousTypes={setSousTypes}
              onChange={handleArrayChange}
              isLoading={isLoading || isEditLoading}
              onRemoveClick={() => handleRemoveArrayItem(
                i,
                'sousTypes',
                sousTypes,
                setSousTypes
              )}
            />)}
          
          <InputGroup className='text-center'>
            <Button
              disabled={isLoading || isEditLoading}
              type='button'
              variant='danger'
              className='w-50'
              onClick={onResetItems}> <i className='bi bi-trash' /> </Button>
            
            <Button
              disabled={isLoading || isEditLoading}
              type='button'
              variant='secondary'
              className='w-50'
              onClick={(): void => handleAddArrayItem(
                'sousTypes',
                sousTypes,
                setSousTypes,
                [{nom: '', id: 0}]
              )}> <i className='bi bi-plus'/> </Button>
          </InputGroup>
        </div>
        
        <hr/>
        
        <Button
          disabled={isLoading || isEditLoading}
          type='submit'
          className='w-100'>
          {!(isLoading || isEditLoading) && <i className={`bi bi-${data ? 'pencil-square' : 'floppy'} me-1`}/>}
          {(isLoading || isEditLoading) && <Spinner className='me-1' animation='border' size='sm'/>}
          {(isLoading || isEditLoading)
            ? 'Veuillez patienter': data
              ? 'Modifier'
              : 'Enregistrer'}
        </Button>
      </form>
    </>
  )
  
}
