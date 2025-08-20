// Service User à implémenter
  
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
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
