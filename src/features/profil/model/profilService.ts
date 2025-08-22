// INTERFACES
export interface ChangeProfilePassword {
  password: string
  repeatPassword: string
}

export interface ChangeProfilePasswordError {
  password: string | null
  repeatPassword: string | null
}
// END INTERFACES

// ---

// INIT STATES
export const initPasswordState = (): ChangeProfilePassword => ({
  password: '',
  repeatPassword: '',
})

export const initPasswordErrorState = (): ChangeProfilePasswordError => ({
  password: null,
  repeatPassword: null,
})
// END INIT STATES

// ---
