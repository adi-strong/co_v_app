import type {ReactNode} from "react";
import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../services/services.ts";
import Select from "react-select";
import {Form, Spinner} from "react-bootstrap";

type SelectMultipleProps = {
  options: MultiValue<SelectOptionType> | []
  value: MultiValue<SelectOptionType>
  onChange: (newValue: MultiValue<SelectOptionType>) => void
  closeMenuOnSelect?: boolean
  placeholder?: string
  label?: any | undefined
  name: string
  required?: boolean
  disabled?: boolean
  error?: string | null
  onRefresh?: () => void | Promise<void>
}

const MultiSelectField: React.FC<SelectMultipleProps> = (
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
    error,
    onRefresh,
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
      
      <Select
        isMulti
        isDisabled={disabled}
        required={required}
        inputId={name}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: '100%',
            padding: '0.1rem 1rem',
            fontSize: '0.9375rem',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#637381',
            backgroundColor: '#fff',
            backgroundClip: 'padding-box',
            border: error ? '1px solid #dc3545' : '1px solid #c4cdd5',
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
          
          multiValue: (base) => ({
            ...base,
            color: 'rgb(82, 67, 170)',
            borderColor: '#b1a5ff',
          }),
          
          multiValueLabel: (base) => ({
            ...base,
            color: 'rgb(82, 67, 170)',
            borderColor: '#b1a5ff',
          }),
        }}
      />
      
      {error && <div style={{ color: '#dc3545' }}>{error}</div>}
    </>
  ) as ReactNode
  
}

export default MultiSelectField
