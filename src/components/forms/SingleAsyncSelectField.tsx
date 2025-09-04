import type {MultiValue, SingleValue} from "react-select";
import type {SelectOptionType} from "../../services/services.ts";
import type {ReactNode} from "react";
import {Form, Spinner} from "react-bootstrap";
import AsyncSelect from "react-select/async";

type SingleSelectProps = {
  options: MultiValue<SelectOptionType>
  value: SingleValue<SelectOptionType> | null
  onChange: (newValue: SingleValue<SelectOptionType>) => void
  closeMenuOnSelect?: boolean
  placeholder?: string
  label?: any
  name: string
  required?: boolean
  disabled?: boolean
  error?: string | null
  onRefresh?: () => void | Promise<void>
  isClearable?: boolean
  size?: 'sm'
  loadOptions: (params?: any) => Promise<any>
}

const SingleAsyncSelectField: React.FC<SingleSelectProps> = (
  {
    closeMenuOnSelect = true,
    options = [],
    value,
    onChange,
    placeholder,
    label,
    name,
    required = false,
    disabled = false,
    error = null,
    onRefresh,
    isClearable = true,
    size,
    loadOptions,
  }) => {
  
  return (
    <>
      {label && (
        <Form.Label htmlFor={name}>
          {onRefresh && (
            <>
              {!disabled && <i className='bi bi-arrow-clockwise cursor-pointer text-primary me-1' onClick={onRefresh}/>}
              {disabled && <Spinner animation='grow' size='sm' className='me-1 text-primary' />}
            </>
          ) as ReactNode}
          
          {label}
          {(required && <code className='mx-1'>*</code>) as ReactNode}
        </Form.Label>
      )}
      
      <AsyncSelect
        isClearable={isClearable}
        inputId={name} // pour l'accessibilité avec Form.Label
        isDisabled={disabled}
        name={name}
        required={required}
        defaultOptions={options}
        value={value}
        onChange={onChange}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder}
        
        loadOptions={loadOptions}
        
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: '100%',
            padding: size ? undefined : '0.1rem 1rem',
            fontSize: size ? '0.8203125rem' : '0.9375rem',
            minWidth: size ? 'calc(1.5rem + 0.5rem + 2px)' : undefined,
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#637381',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: error ? '1px solid #dc3545' : '1px solid #c4cdd5',
            borderRadius: size ? '0.2rem' : '0.375rem',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            boxShadow: state.isFocused
              ? '0 0 0 0.25rem rgba(98, 75, 255, 0.25)'
              : 'none',
            '&:hover': {
              borderColor: error ? '#dc3545' : '#b1a5ff',
            },
            '&:focus': {
              color: '#637381',
            },
          }),
        }}
      />
      
      {error && <div style={{ color: '#dc3545' }}>{error}</div>}
    </>
  ) as ReactNode
}

export default SingleAsyncSelectField;
