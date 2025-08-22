import type {MultiValue} from "react-select";
import type {SelectOptionType, TabInt} from "../../../services/services.ts";
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
  selected: boolean
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

export type UserRoleKeys = 'ROLE_CONTRIBUTOR' | 'ROLE_AUTHOR' | 'ROLE_EDITOR' | 'ROLE_ADMIN' | 'ROLE_SUPER_ADMIN'
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

export const userRoleLabel: Record<UserRoleKeys, string> = {
  ROLE_ADMIN: 'Administrateur/administratrice',
  ROLE_AUTHOR: 'Auteur/autrice',
  ROLE_CONTRIBUTOR: 'Contributeur/contributrice',
  ROLE_EDITOR: 'Éditeur/éditrice',
  ROLE_SUPER_ADMIN: 'Super administrateur/administratrice'
}

export const userRoleColor: Record<UserRoleKeys, string> = {
  ROLE_ADMIN: 'danger',
  ROLE_SUPER_ADMIN: 'primary',
  ROLE_AUTHOR: 'warning',
  ROLE_CONTRIBUTOR: 'dark',
  ROLE_EDITOR: 'success',
}

export const getProfileTabItems = (): TabInt[] => [
  { title: 'Aperçu', event: 'overview' },
  { title: 'Changer le mot de passe', event: 'edit_password' },
]
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getUserFakeData = (): User[] => [
  {
    id: 1,
    tel: '0891759667',
    active: true,
    email: 'adi.life91@gmail.com',
    roles: ['ROLE_SUPER_ADMIN'],
    fullName: 'Adivin Lifwa',
    createdAt: new Date().toISOString(),
    username: 'adi.life91',
    slug: 'adi',
    authorizations: [],
    selected: false
  },
]

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
