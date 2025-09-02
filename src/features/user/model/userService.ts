import type {MultiValue, SingleValue} from "react-select";
import type {SelectOptionType, TabInt, THeadItemType} from "../../../services/services.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {NavigateFunction} from "react-router-dom";
import type {Agent} from "../../personnel/agent/model/agentService.ts";
  
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

export type PassType = {
  userId: number
  password: string
  confirmPass: string
}

export interface SaveUser {
  id: number
  username: string
  password: string
  passwordConfirm: string
  roles: MultiValue<SelectOptionType>
  fkAgent: SingleValue<SelectOptionType> | null
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
  fkAgent: string | null
}

export type UserRoleKeys =
  'ROLE_USER' |
  'ROLE_PHAR' |
  'ROLE_RECEPTIONNISTE' |
  'ROLE_LAB' |
  'ROLE_INFIRMIER' |
  'ROLE_MEDECIN' |
  'ROLE_MEDECIN_DIRECTEUR' |
  'ROLE_PROMOTEUR' |
  'ROLE_ADMIN' |
  'ROLE_SUPER_ADMIN'
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initUserState = (): SaveUser => ({
  id: 0,
  username: '',
  fullName: '',
  password: '',
  passwordConfirm: '',
  tel: '',
  email: '',
  active: true,
  roles: [],
  fkAgent: null,
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
  fkAgent: null,
})

export const userRoleLabel: Record<UserRoleKeys, string> = {
  ROLE_ADMIN: 'Administrateur/administratrice',
  ROLE_LAB: 'Laborantin',
  ROLE_PHAR: 'Pharmacien',
  ROLE_MEDECIN: 'Médecin',
  ROLE_SUPER_ADMIN: 'Super administrateur/administratrice',
  ROLE_INFIRMIER: 'Infirmier',
  ROLE_MEDECIN_DIRECTEUR: 'Médecin directeur',
  ROLE_PROMOTEUR: 'Promoteur',
  ROLE_RECEPTIONNISTE: 'Réceptionniste',
  ROLE_USER: 'Simple utilisateur',
}

export const userRoleColor: Record<UserRoleKeys, string> = {
  ROLE_ADMIN: 'danger',
  ROLE_SUPER_ADMIN: 'primary',
  ROLE_LAB: 'warning',
  ROLE_RECEPTIONNISTE: 'dark',
  ROLE_PHAR: 'dark',
  ROLE_USER: 'secondary',
  ROLE_PROMOTEUR: 'success',
  ROLE_MEDECIN: 'warning',
  ROLE_MEDECIN_DIRECTEUR: 'warning',
  ROLE_INFIRMIER: 'dark',
}

export const getProfileTabItems = (): TabInt[] => [
  { title: 'Aperçu', event: 'overview' },
  { title: 'Changer le mot de passe', event: 'edit_password' },
]

export const initUserRoles = (): string[] => [
  'ROLE_USER',
  'ROLE_PHAR',
  'ROLE_RECEPTIONNISTE',
  'ROLE_LAB',
  'ROLE_INFIRMIER',
  'ROLE_MEDECIN',
  'ROLE_MEDECIN_DIRECTEUR',
  'ROLE_PROMOTEUR',
  'ROLE_ADMIN',
  'ROLE_SUPER_ADMIN',
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

export const getUserHeadItems = ():THeadItemType[] => [
  { th: 'Nom complet' },
  { th: 'Rôles' },
  { th: 'N° Tél.' },
  { th: 'Date' },
]

export const getUserRolesOptions = (): MultiValue<SelectOptionType> => {
  return [
    { label: 'Réceptionniste', value: 'Réceptionniste', data: 'ROLE_RECEPTIONNISTE' },
    { label: 'Pharmacien', value: 'Pharmacien', data: 'ROLE_PHAR' },
    { label: 'Laborantin', value: 'Laborantin', data: 'ROLE_LAB' },
    { label: 'Infirmier', value: 'Infirmier', data: 'ROLE_INFIRMIER' },
    { label: 'Médecin', value: 'Médecin', data: 'ROLE_MEDECIN' },
    { label: 'Médecin directeur', value: 'Médecin directeur', data: 'ROLE_MEDECIN_DIRECTEUR' },
    { label: 'Administrateur', value: 'Administrateur', data: 'ROLE_ADMIN' },
    { label: 'Super Administrateur', value: 'Super Administrateur', data: 'ROLE_SUPER_ADMIN' },
  ]
}

export const getUserRole = (roles: string[]): string => {
  const rolePriority = [
    'ROLE_SUPER_ADMIN',
    'ROLE_ADMIN',
    'ROLE_PROMOTEUR',
    'ROLE_MEDECIN_DIRECTEUR',
    'ROLE_MEDECIN',
    'ROLE_LAB',
    'ROLE_PHAR',
    'ROLE_RECEPTIONNISTE',
    'ROLE_USER'
  ]
  
  const allowedRoles: string[] = initUserRoles()
  
  for (const priorityRole: string of rolePriority) {
    if (roles.includes(priorityRole) && allowedRoles.includes(priorityRole)) {
      return priorityRole
    }
  }
  
  return 'ROLE_USER' // Par défaut
}

export async function onUserSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveUser,
  setErrors: Dispatch<SetStateAction<UserError>>,
  onSubmit: (data: SaveUser) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void,
  user?: User
): Promise<void> {
  
  e.preventDefault()
  let slug: string
  
  const { id } = state
  if (id > 0 && user && user?.slug) slug = user.slug
  
  try {
    const { data, error}: JsonLdApiResponseInt<User> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      if (onRefresh) onRefresh()
      if (id < 1) navigate('/app/users')
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteUserSubmit(
  state: User,
  onSubmit: (data: User) => Promise<void>,
  onRefresh: () => void,
  onHide: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  onHide()
  
  const { error }: JsonLdApiResponseInt<User> = await onSubmit(state)
  if (error && error.data && error.data?.detail) toast.error(error.data.detail)
  else {
    toast.success('Suppression bien effectuée.')
    onRefresh()
    if (navigate) navigate('/app/users')
  }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
