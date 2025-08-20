import type {TextFormFieldInt} from "../../interfaces/TextFormFieldInt.ts";
import {Form} from "react-bootstrap";
import {FeedbackError} from "../index.ts";
import type {ReactNode} from "react";

const TextField = (
  {
    type = 'text',
    className,
    accept,
    autoFocus = false,
    error = null,
    label,
    name,
    size,
    disabled = false,
    onChange,
    required = false,
    value,
    placeholder,
    autoComplete = 'off',
    text,
  }: TextFormFieldInt) => {

  return (
    <>
      {label &&
        <Form.Label htmlFor={name}>
          {(required && <code className='me-1'>*</code>) as ReactNode}
          {label}
        </Form.Label>}
      
      <Form.Control
        isInvalid={error != null}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        disabled={disabled}
        size={size}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        className={className}
        accept={accept}
      />
      
      {text && <Form.Text>{text}</Form.Text>}
      
      { error && <FeedbackError error={error} />}
    </>
  )
  
}

export default TextField;
