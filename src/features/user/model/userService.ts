import type {MultiValue} from "react-select";
import type {SelectOptionType} from "../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
  
// INTERFACES OR TYPES
export interface User {
  '@id'?: string
  id: number
  username: string
  roles: string[]
  authorizations: string[]
  tel: string
  email?: string
  fkUser?: User
  fullName: string
  active: boolean
  slug?: string
  createdAt?: string
  updatedAt?: string
}

export interface SaveUser {
  id: number
  username: string
  password: string
  passwordConfirm: string
  roles: MultiValue<SelectOptionType>
  // authorizations: string[]
  tel: string
  email: string
  fullName: string
  active: boolean
}

export interface UserError {
  username: string | null
  password: string | null
  passwordConfirm: string | null
  roles: string | null
  tel: string | null
  email: string | null
  fullName: string | null
  active: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initUserState = (): SaveUser => ({
  id: 0,
  active: false,
  password: '',
  email: '',
  tel: '',
  roles: [],
  passwordConfirm: '',
  fullName: '',
  username: '',
})

export const initUserErrorState = (): UserError => ({
  username: null,
  password: null,
  passwordConfirm: null,
  roles: null,
  tel: null,
  email: null,
  fullName: null,
  active: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export async function onUserSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveUser,
  setErrors: Dispatch<SetStateAction<UserError>>,
  onSubmit: (data: SaveUser) => Promise<any>,
  onHide: () => void,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  try {
    const { data, error}: JsonLdApiResponseInt<User> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      if (onRefresh) onRefresh()
      onHide()
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
