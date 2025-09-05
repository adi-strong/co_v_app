import type {User} from "../../../user/model/userService.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import toast from "react-hot-toast";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {NavigateFunction} from "react-router-dom";
import type {THeadItemType} from "../../../../services/services.ts";

// INTERFACES OR TYPES
export interface Fournisseur {
  '@id'?: string
  id: number
  nom?: string
  nomCommercial: string
  abreviation?: string
  tel: string
  email?: string
  focal?: string
  adresse?: string
  fkUser?: User
  slug?: string
  createdAt?: string
  updatedAt?: string
  selected: boolean
}

export interface SaveFournisseur {
  id: number
  nom: string
  nomCommercial: string
  abreviation: string
  tel: string
  email: string
  focal: string
  adresse: string
}

export interface FournisseurError {
  nom: string | null
  nomCommercial: string | null
  abreviation: string | null
  tel: string | null
  email: string | null
  focal: string | null
  adresse: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initFournisseurState = (): SaveFournisseur => ({
  nom: '',
  id: 0,
  abreviation: '',
  adresse: '',
  email: '',
  focal: '',
  tel: '',
  nomCommercial: '',
})

export const initFournisseurErrorState = (): FournisseurError => ({
  nom: null,
  nomCommercial: null,
  abreviation: null,
  tel: null,
  email: null,
  focal: null,
  adresse: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getFournisseurFakeData = (): Fournisseur[] => [
  {
    id: 1,
    nom: 'Back Office Pro',
    tel: '0891759667',
    adresse: 'Lorem Ispum',
    abreviation: 'BOP',
    focal: 'Life',
    email: 'bop@gmail.com',
    slug: 'bop',
    createdAt: new Date().toISOString(),
    nomCommercial: 'BOP',
    selected: false,
  },
  {
    id: 2,
    nom: 'J-1',
    tel: '0891759667',
    adresse: 'Lorem Ispum',
    abreviation: 'Guy',
    email: 'j-1@gmail.com',
    slug: 'bop',
    createdAt: new Date().toISOString(),
    nomCommercial: 'Joel Corp',
    selected: false,
  },
]

export const getFournisseurHeadItems = (): THeadItemType[] => [
  { th: 'Point focal' },
  { th: 'N° Tél.' },
  { th: 'E-mail' },
  { th: 'Date' },
]

export async function onFournisseurSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveFournisseur,
  setErrors: Dispatch<SetStateAction<FournisseurError>>,
  onSubmit: (data: SaveFournisseur) => Promise<any>,
  onRefresh: () => void,
  onHide: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  
  setErrors(initFournisseurErrorState())
  
  try {
    const { data, error}: JsonLdApiResponseInt<Fournisseur> = await onSubmit(state)
    if (data) {
      toast.success(`${id > 0 ? 'Modification ' : 'Enregistrement '} bien effectué${'e'}`)
      onRefresh()
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

export async function onDeleteFournisseurSubmit(
  state: Fournisseur,
  onSubmit: (data: Fournisseur) => Promise<void>,
  onRefresh: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  try {
    const { error }: JsonLdApiResponseInt<Fournisseur> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/fournisseurs')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
