import type {User} from "../../../user/model/userService.ts";
import type {CategorieProduit} from "../../categorieProduit/model/categorieProduitService.ts";
import type {ImageListType} from "react-images-uploading";
import type {MediaObjectInt} from "../../../../interfaces/MediaObjectInt.ts";
import type {SingleValue} from "react-select";
import type {SelectOptionType, THeadItemType} from "../../../../services/services.ts";
import {getCategorieProduitFakeData} from "../../categorieProduit/model/categorieProduitService.ts";
import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {NavigateFunction} from "react-router-dom";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import toast from "react-hot-toast";
import type {UniteConsommation} from "../../uniteConsommation/model/uniteConsommationService.ts";
import {getUniteConsommationFakeData} from "../../uniteConsommation/model/uniteConsommationService.ts";

// INTERFACES OR TYPES
export interface Produit {
  '@id'?: string
  id: number
  nom: string
  code: string
  codeBar?: string
  codeQr?: string
  description?: string
  fkUser?: User
  fkCategorie?: CategorieProduit
  fkUnite?: UniteConsommation
  image?: MediaObjectInt
  slug?: string
  createdAt?: string
  updatedAt?: string
  selected: boolean
}

export interface SaveProduit {
  id: number
  nom: string
  code: string
  codeBar: string
  codeQr: string
  description: string
  fkCategorie: SingleValue<SelectOptionType> | null
  fkUnite: SingleValue<SelectOptionType> | null
  file: ImageListType
}

export interface ProduitError {
  nom: string | null
  code: string | null
  codeBar: string | null
  codeQr: string | null
  description: string | null
  fkCategorie: string | null
  fkUnite: string | null
  file: string | null
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
export const initProduitState = (): SaveProduit => ({
  id: 0,
  code: '',
  codeBar: '',
  codeQr: '',
  file: [],
  nom: '',
  description: '',
  fkCategorie: null,
  fkUnite: null,
})

export const initProduitErrorState = (): ProduitError => ({
  nom: null,
  code: null,
  codeBar: null,
  codeQr: null,
  description: null,
  fkCategorie: null,
  fkUnite: null,
  file: null,
})
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getProduitFakeData = (): Produit[] => [
  {
    id: 1,
    nom: 'Doliprane',
    code: '01',
    slug: 'doliprane',
    description: 'Lorem Ipsum',
    createdAt: new Date().toISOString(),
    fkCategorie: getCategorieProduitFakeData()[0],
    selected: false,
    fkUnite: getUniteConsommationFakeData()[0],
  },
  {
    id: 2,
    nom: 'Amoxycilline',
    code: '01',
    slug: 'amoxy',
    description: 'Lorem Ipsum',
    createdAt: new Date().toISOString(),
    fkCategorie: getCategorieProduitFakeData()[0],
    selected: false,
    fkUnite: getUniteConsommationFakeData()[0],
  },
]

const castProduitToForomData = (state: SaveProduit): FormData => {
  const formData = new FormData()
  
  const {
    nom,
    codeBar,
    code,
    codeQr,
    description,
    fkCategorie,
    file,
  } = state
  
  if (nom) formData.append('nom', nom)
  if (codeBar) formData.append('codeBar', codeBar)
  if (code) formData.append('code', code)
  if (codeQr) formData.append('codeQr', codeQr)
  if (description) formData.append('description', description)
  if (fkCategorie && fkCategorie?.data) formData.append('fkCategorie', fkCategorie.data)
  if (file && file[0]?.file) formData.append('file', file[0].file)
  
  return formData
}

export const getProduitHeadItems = (): THeadItemType[] => [
  { th: 'Code' },
  { th: 'Quantité' },
  { th: 'U.C' },
  { th: 'Prix TTC' },
  { th: 'Péremption' },
]

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param navigate
 * @param onRefresh
 */
export async function onPostProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveProduit,
  setErrors: Dispatch<SetStateAction<ProduitError>>,
  onSubmit: (data: FormData) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  setErrors(initProduitErrorState())
  const submitData: FormData = castProduitToForomData(state)
  
  try {
    const { data, error }: JsonLdApiResponseInt<Produit> = await onSubmit(submitData)
    if (data) {
      toast.success('Enregistrement bien effectué.')
      if (onRefresh) onRefresh()
      navigate('/app/produits')
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

/**
 *
 * @param e
 * @param state
 * @param setErrors
 * @param onSubmit
 * @param navigate
 * @param onRefresh
 */
export async function onPatchProduitSubmit(
  e: FormEvent<HTMLFormElement>,
  state: SaveProduit,
  setErrors: Dispatch<SetStateAction<ProduitError>>,
  onSubmit: (data: SaveProduit) => Promise<any>,
  navigate: NavigateFunction,
  onRefresh?: () => void
): Promise<void> {
  
  e.preventDefault()
  const { id } = state
  
  try {
    const { data, error }: JsonLdApiResponseInt<Produit> = await onSubmit(state)
    if (data) {
      toast.success('Modification bien effectuée.')
      if (onRefresh) onRefresh()
      navigate(`/app/produits/${id}/${data?.slug}`)
    }
    
    if (error && error?.data) {
      const { violations } = error.data
      if (violations) violations.forEach(({ message, propertyPath }): void => {
        setErrors(prev => ({ ...prev, [propertyPath]: message }))
      })
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}

export async function onDeleteProduit(
  state: Produit,
  onSubmit: (data: Produit) => Promise<void>,
  onRefresh: () => void,
  navigate?: NavigateFunction
): Promise<void> {
  
  try {
    const { error }: JsonLdApiResponseInt<Produit> = await onSubmit(state)
    if (error) {
      if (error?.data) toast.error(error.data.detail)
    } else {
      toast.success('Suppression bien effectuée.')
      onRefresh()
      if (navigate) navigate('/app/agents')
    }
  } catch (e) { toast.error('Problème réseau.') }
  
}
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
