import type {ChangeEventHandler} from "react";

export interface TextAreaFormFieldInt {
  autoFocus?: boolean
  autoComplete?: string
  name: string
  placeholder?: string
  value: any
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  required?: boolean
  label?: any
  disabled?: boolean
  error?: string | undefined | null
  rows?: number
  cols?: number
  text?: string
}
