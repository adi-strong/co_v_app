import type {MultiValue, SingleValue} from "react-select";
import type {SelectOptionType} from "../../services/services.ts";
import type {ReactNode} from "react";
import Select from "react-select";

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
}

const SingleSelectField: React.FC<SingleSelectProps> = (
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
    isClearable = true
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
          )}
          
          {label}
          {required && <code className='mx-1'>*</code>}
        </Form.Label>
      )}
      
      <Select
        isClearable={isClearable}
        inputId={name} // pour l'accessibilité avec Form.Label
        isDisabled={disabled}
        name={name}
        required={required}
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
        }}
      />
      
      {error && <div style={{ color: '#dc3545' }}>{error}</div>}
    </>
  ) as ReactNode
}

export default SingleSelectField;
