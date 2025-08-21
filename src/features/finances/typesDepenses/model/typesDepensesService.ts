// Service TypesDepenses à implémenter
import toast from "react-hot-toast";
import {ErrorJsonLDResponse} from "../../../interfaces/ErrorJsonLDResponse";

export type SubExpenseType = { nom: string | undefined | null }

export type TDepenseType = {
  nom: string
  id: number
}

export type TSousType = {
  id?: number | undefined
  nom: string
}

export type TDSousTypes = {
  sousTypes: TSousType[]
}

export interface SubExpense {
  '@id'?: string | undefined
  id: number
  nom: string
}

export interface ExpenseType {
  '@id'?: string | undefined
  id: number
  nom: string
  slug?: string | undefined | null
  sousTypeDepenses?: SubExpense[] | undefined
  totalSousTypes?: number | undefined
}

export interface ExpenseErrorState { nom: any }

export interface ExpenseTypeSaver {
  id?: number
  nom: string
  sousTypes: TSousType[]
}

export interface ExpenseTypeResponse {
  data: ExpenseType | undefined | null;
  error: ErrorJsonLDResponse;
}

export interface ExpenseTypeFormModalProps {
  data: ExpenseType;
  show: boolean;
  onHide: () => void;
  onRefresh: () => void;
}

export const initTypeDepState = (): ExpenseType => ({
  "@id": undefined,
  id: 0,
  nom: '',
  slug: undefined,
  sousTypeDepenses: undefined,
  totalSousTypes: undefined
})

export const initSousTypesState = (): TDSousTypes => ({ sousTypes: [] })

export const initExpenseTypeErrorState = (): ExpenseErrorState => ({ nom: null })

export const onTypeSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  state: ExpenseType,
  sousTypeState: TDSousTypes,
  errorState: ExpenseErrorState,
  setErrorState: React.Dispatch<React.SetStateAction<ExpenseErrorState>>,
  onSubmit: (type: ExpenseTypeSaver) => Promise<any>,
  onHide: () => void,
  onRefresh: () => void
): Promise<void> => {
  e.preventDefault()
  setErrorState(initExpenseTypeErrorState())
  const { nom, id } = state
  const { sousTypes } = sousTypeState
  
  const sendPost: ExpenseTypeSaver = { nom, sousTypes }
  const sendPatch: ExpenseTypeSaver = { id, nom, sousTypes }
  
  try {
    const { data, error }: ExpenseTypeResponse = await onSubmit(id > 0 ? sendPatch : sendPost)
    if (data) {
      toast.success(`${id > 0 ? 'Modification' : 'Opération'} bien effectuée.`)
      onHide()
    }
    
    if (error) {
      const { violations } = error.data
      if (violations) {
        violations.forEach(({ propertyPath, message }): void => {
          setErrorState({ ...errorState, [propertyPath]: message })
        })
      }
    }
  } catch (e) {
    toast.error('Problème réseau.')
  }
  
  onRefresh()
}

export const onDeleteExpenseTypeSubmit = async (
  expense: ExpenseType,
  onSubmit: (expenseType: ExpenseType) => Promise<any>,
  onRefresh: () => void,
  onHide: () => void
): Promise<void> => {
  onHide()
  try {
    await onSubmit(expense)
    toast.success('Suppression bien effectuée.')
    onRefresh()
  } catch (e) {
    toast.error('Problème réseau.')
  }
}

export const expenseTypesOpenEditModal = (
  expense: ExpenseType,
  setIsEdited: React.Dispatch<React.SetStateAction<any>>
): void => { setIsEdited(expense); }

export const expenseTypesCloseEditModal = (setIsEdited: React.Dispatch<React.SetStateAction<any>>): void => {
  setIsEdited(null);
}

export const expenseTypesOpenViewModal = (
  expense: ExpenseType,
  setIsEdited: React.Dispatch<React.SetStateAction<any>>
): void => {
  setIsEdited(null);
}

export const expenseTypesOpenDeleteModal = (
  expense: ExpenseType,
  setIsDeleted: React.Dispatch<React.SetStateAction<any>>
): void => { setIsDeleted(expense); }

export const expenseTypesCloseDeleteModal = (setIsDeleted: React.Dispatch<React.SetStateAction<any>>): void => {
  setIsDeleted(null);
}
