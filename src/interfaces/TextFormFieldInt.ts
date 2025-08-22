import type {ChangeEventHandler} from "react";

export interface TextFormFieldInt {
  autoFocus?: boolean
  autoComplete?: string
  type?: string
  name: string
  placeholder?: string
  value?: any
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  required?: boolean
  label?: any
  disabled?: boolean
  size?: 'sm' | 'lg'
  error?: string | null
  accept?: string | undefined
  text?: string
  minLength?: number
  maxLength?: number
}
