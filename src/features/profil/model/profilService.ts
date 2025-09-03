import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../interfaces/JsonLdApiResponseInt.ts";
import type {PassType, User} from "../../user/model/userService.ts";
import {API} from "../../app/store.ts";
import {logout} from "../../auth/model/auth.slice.ts";
import {setResetCompte} from "../../finances/compteCaisse/model/compteCaisse.slice.ts";
import {setResetInfos} from "../../configs/infosGen/model/infosGen.slice.ts";

// INTERFACES
export interface ChangeProfilePassword {
  password: string
  repeatPassword: string
}

export interface ChangeProfilePasswordError {
  password: string | null
  confirmPass: string | null
}
// END INTERFACES

// ---

// INIT STATES
export const initPasswordState = (): PassType => ({
  password: '',
  confirmPass: '',
  userId: 0,
})

export const initPasswordErrorState = (): ChangeProfilePasswordError => ({
  password: null,
  confirmPass: null,
})
// END INIT STATES

// ---

// EVENTS OR FUNCTIONS
export async function onChangePasswordSubmit(
  e: FormEvent<HTMLFormElement>,
  state: PassType,
  setErrors: Dispatch<SetStateAction<ChangeProfilePasswordError>>,
  dispatch: (params?: any) => void,
  onSubmit: (data: PassType) => Promise<any>
): Promise<void> {
  
  e.preventDefault()
  try {
    const { data, error }: JsonLdApiResponseInt<User> = await onSubmit(state)
    if (error && error?.data) {
      toast.error(error.data?.detail ? error.data.detail : 'Un problème est survénu.')
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Mot de passe modifié avec succès.')
      dispatch(API.util?.resetApiState())
      dispatch(setResetCompte())
      dispatch(setResetInfos())
      dispatch(logout())
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onChangePasswordSubmit2(
  e: FormEvent<HTMLFormElement>,
  state: PassType,
  setErrors: Dispatch<SetStateAction<ChangeProfilePasswordError>>,
  onSubmit: (data: PassType) => Promise<any>,
  onHide: () => void
): Promise<void> {
  
  e.preventDefault()
  try {
    const { data, error }: JsonLdApiResponseInt<User> = await onSubmit(state)
    if (error && error?.data) {
      toast.error(error.data?.detail ? error.data.detail : 'Un problème est survénu.')
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
    
    if (data) {
      toast.success('Mot de passe modifié avec succès.')
      onHide()
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS OR FUNCTIONS
