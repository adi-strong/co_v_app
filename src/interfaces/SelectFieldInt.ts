import type {ChangeEventHandler} from "react";
import type {SelectOptionType} from "../services/services.ts";

export interface SelectFieldInt {
  autoFocus?: boolean
  autoComplete?: string
  name: string
  value: any
  onChange: ChangeEventHandler<HTMLSelectElement>
  className?: string
  required?: boolean
  label?: any
  disabled?: boolean
  error?: string | undefined | null
  options?: SelectOptionType[]
  size?: 'sm' | 'lg'
  onRefresh?: () => void | Promise<void>,
  optClassName?: string
  text?: string
}
