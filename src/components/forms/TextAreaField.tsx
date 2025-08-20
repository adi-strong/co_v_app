import {Form} from "react-bootstrap";
import {FeedbackError} from "../index";
import type {TextAreaFormFieldInt} from "../../interfaces/TextAreaFormFieldInt.ts";
import type {ReactNode} from "react";

const TextAreaField = (
  {
    name,
    autoFocus,
    className,
    disabled,
    onChange,
    required,
    error,
    label,
    placeholder,
    value,
    autoComplete,
    rows,
    cols,
    text,
  }: TextAreaFormFieldInt) => {
  
  return (
    <>
      {label && <Form.Label htmlFor={name}>
        {required && <code className='me-1'>*</code> as ReactNode}
        {label}
      </Form.Label>}
      
      <Form.Control
        as='textarea'
        isInvalid={error != null}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        disabled={disabled}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className}
        rows={rows}
        cols={cols}
      />
      
      {text && <Form.Text>{text}</Form.Text>}
      
      { error && <FeedbackError error={error} />}
    </>
  );
  
};

export default TextAreaField;
