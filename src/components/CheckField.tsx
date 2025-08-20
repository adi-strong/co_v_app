import type {ChangeEventHandler, ReactNode} from "react";
import {Form} from "react-bootstrap";

export interface CheckFieldInterface {
  autoFocus?: boolean
  autoComplete?: string
  type?: 'checkbox' | 'radio' | 'switch'
  name: string
  value?: any
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  required?: boolean
  label?: any
  disabled?: boolean
  error?: string | undefined | null
  inline?: boolean
  checked?: any
}

const CheckField = (
  {
    name,
    value,
    onChange = (): void => { },
    autoFocus = false,
    autoComplete = 'off',
    required = false,
    className,
    label,
    disabled = false,
    error,
    type = 'checkbox',
    inline = false,
    checked
  }: CheckFieldInterface) => {
  
  return (
    <>
      <Form.Check
        inline={inline}
        type={type}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={className}
        id={name}
        checked={checked}
        label={(
          <>
            {required && <code className='me-1'>*</code>}
            {label && <span className='text-dark'>{label}</span>}
          </>
        ) as ReactNode}
      />
    </>
  );
  
};

export default CheckField;
