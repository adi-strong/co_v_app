import type {SelectFieldInt} from "../../interfaces/SelectFieldInt.ts";
import {Form} from "react-bootstrap";
import type {ReactNode} from "react";

const SelectField = (
  {
    label,
    name,
    required = false,
    onChange,
    className,
    autoFocus,
    disabled,
    error,
    size,
    value,
    options = [],
    autoComplete,
    onRefresh,
    optClassName,
    text,
  }: SelectFieldInt) => {

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
      
      <Form.Select
        autoComplete={autoComplete}
        isInvalid={error != null}
        disabled={disabled}
        size={size}
        id={name}
        value={value}
        className={className}
        name={name}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
      >
        {(options && options?.length > 0 && options?.map((o: {
          value: any;
          label: string;
        }, i: number) =>
          <option key={i} value={o.value} className={optClassName ?? ''}>{o.label}</option>)) as ReactNode}
      </Form.Select>
      
      {text && <Form.Text>{text}</Form.Text>}
      
      { error && <FeedbackError error={error} /> }
    </>
  )
  
};

export default SelectField;
