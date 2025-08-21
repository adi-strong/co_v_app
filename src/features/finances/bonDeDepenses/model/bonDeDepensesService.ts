import toast from "react-hot-toast";
import {MultiValue, SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {ExpenseType} from "../../typesDepenses/model/typesDepensesService.ts";
import type {ErrorJsonLDResponseInt} from "../../../../interfaces/ErrorJsonLDResponseInt.ts";
import {formatDecimalNumberWithSpaces} from "../../../../services/services.ts";
import type {SubDataType} from "../../../../interfaces/SelectFieldInt.ts";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {User} from "../../../user/model/userService.ts";
import type {CompteCaisse} from "../../compteCaisse/model/compteCaisseService.ts";

export interface ExpenseFilters {
  startAt: string
  endAt: string
  object: string
  expenseType: SingleValue<SelectOptionType> | null
  expenseId: number | string | null
}

export interface ExpenseToExport {
  id: number
  objet: string
  sTotal: string
  date: string
}

export interface DesignationBonDeDepense {
  '@id'?: string | undefined
  id?: number
  libelle: string,
  qte: number,
  prixUnitaire: number
  fkTypeDepense?: ExpenseType | undefined | null,
}

export interface Expense {
  '@id'?: string | undefined | null
  id: number
  designations: ExpenseDesignation[]
  objet: string
  demandeur: string
  createdAt?: string | undefined | null
  slug?: string
  fkUser?: User
  fkCompte?: CompteCaisse
  designationBonDeDepenses: DesignationBonDeDepense[]
}

export type ExpenseDesignation = {
  libelle: string | undefined | null,
  qte: number,
  prixUnitaire: number
  id?: number | undefined | null
  typeId?: number | undefined | null
}

export interface ExpenseSaver {
  designations: ExpenseDesignation[]
  objet: string
  demandeur: string | undefined | null
  id: number
  createdAt?: string | undefined | null
  updatedAt?: string | undefined | null
}

export interface ExpenseError {
  designations: string | null
  objet: string | null
  demandeur: string | null
  adresse: string | null
}

export type ExpenseResponse = {
  data: Expense | undefined | null
  error: ErrorJsonLDResponseInt
}

export interface ExpenseFormModalProps {
  data?: Expense | undefined | null
  show: boolean
  onHide: () => void
  onRefresh: () => void
}

export interface ExpenseFormModalProps {
  data?: Expense | undefined | null
  show: boolean
  onHide: () => void
  onRefresh: () => void
}

export const initExpenseState = (): ExpenseSaver => ({
  designations: [],
  objet: '',
  demandeur: '',
  id: 0,
  createdAt: '',
})

export const initExpenseErrorState = (): ExpenseError => ({
  designations: null,
  objet: null,
  demandeur: null,
  adresse: null,
})

export const initExpenseFilters = (): ExpenseFilters => ({
  endAt: '',
  expenseType: null,
  object: '',
  startAt: '',
  expenseId: '',
})

const expenseData = (expense: ExpenseSaver): ExpenseSaver => {
  const {
    id,
    objet,
    designations,
    demandeur,
  } = expense
  
  const createdAt = expense?.createdAt ? expense.createdAt : null
  
  return {
    id,
    objet: objet,
    designations,
    createdAt,
    demandeur,
  }
}

export const onExpenseSubmit = async (
  state: ExpenseSaver,
  setErrors: React.Dispatch<React.SetStateAction<ExpenseError>>,
  onSubmit: (order: ExpenseSaver) => Promise<any>,
  onHide: () => void,
  onRefresh: () => void,
  setState?: React.Dispatch<React.SetStateAction<ExpenseSaver>>,
): Promise<void> => {
  setErrors(initExpenseErrorState())
  
  const { id } = state
  const expense = expenseData(state)
  try {
    const { data, error }: ExpenseResponse = await onSubmit(expense)
    
    if (data) {
      toast.success(id > 0 ? 'Modification bien effectuée.' : 'Enregistrement bien effectué.')
      if (setState) setState(initExpenseState())
      onRefresh()
      onHide()
    }
    
    if (error) {
      const { violations } = error?.data
      if (violations) violations.forEach(({ propertyPath, message }): void => {
        setErrors(prevState => ({ ...prevState, [propertyPath]: message }))
      })
    }
  } catch (e) {
    toast.error('Problème réseau.')
  }
}

export const onDeleteExpenseSubmit = async (
  state: Expense,
  onSubmit: (order: Expense) => Promise<any>,
  onRefresh: () => void,
  onHide: () => void
): Promise<void> => {
  onHide()
  try {
    await onSubmit(state)
    toast.success('Suppression bien effectuée.')
    onRefresh()
  } catch (e) {
    toast.error('Problème réseau.')
  }
}

export const onExpenseOpenEditModal = (
  order: Expense,
  setIsEdited: React.Dispatch<React.SetStateAction<any>>
): void => { setIsEdited(order); }

export const onExpenseCloseEditModal = (setIsEdited: React.Dispatch<React.SetStateAction<any>>): void => {
  setIsEdited(null);
}

export const onExpenseOpenDeleteModal = (
  order: Expense,
  setIsDeleted: React.Dispatch<React.SetStateAction<any>>
): void => { setIsDeleted(order); }

export const onExpenseCloseDeleteModal = (setIsDeleted: React.Dispatch<React.SetStateAction<any>>): void => {
  setIsDeleted(null);
}

export const totalExpenseItem = (item: ExpenseDesignation): string => {
  const price = isNaN(item.prixUnitaire) || item.prixUnitaire < 0 ? 0 : item.prixUnitaire
  const quantity = isNaN(item.qte) || item.qte < 0 ? 0 : item.qte
  
  return formatDecimalNumberWithSpaces((price * quantity))
}

export const totalExpenseAmount = (designations: ExpenseDesignation[]): string => {
  let sum = 0
  
  if (designations.length > 0) {
    designations.forEach(({ qte, prixUnitaire }): void => {
      const price = isNaN(prixUnitaire) || prixUnitaire < 0 ? 0 : prixUnitaire
      const quantity = isNaN(qte) || qte < 0 ? 0 : qte
      sum += price * quantity
    })
  }
  
  return formatDecimalNumberWithSpaces(sum)
}

export const onExpenseCurrentTotalSum = (expenses: Expense[]) => {
  let sum = 0
  
  if (expenses.length > 0) {
    for (const key in expenses) {
      const order = expenses[key]
      const designations = order.designationBonDeDepenses
      
      if (designations && designations.length > 0) {
        for (const j in designations) {
          const d = designations[j]
          const price = isNaN(d.prixUnitaire) || d.prixUnitaire < 0 ? 0 : d.prixUnitaire
          const quantity = isNaN(d.qte) || d.qte < 0 ? 0 : d.qte
          sum += price * quantity
        }
      }
    }
  }
  
  return '$ ' + formatDecimalNumberWithSpaces(sum)
}

export const onExpTypeOptionChange = (
  newValue: MultiValue<SelectOptionType>,
  oldSelectedSubTypes: MultiValue<SelectOptionType>,
  setState: React.Dispatch<React.SetStateAction<any>>,
  setSubDataOptionsState: React.Dispatch<React.SetStateAction<SubDataType[]>>,
  setSubDataState: React.Dispatch<React.SetStateAction<any>>
): void => {
  const updatedSubData: SubDataType[] = newValue.flatMap(opt => opt.subData || []);
  const updatedSubDataIds = new Set(updatedSubData.map(sub => sub.data));
  
  const filteredSelectedSubTypes = oldSelectedSubTypes.filter(sub =>
    updatedSubDataIds.has(sub.data)
  );
  
  setState(newValue);
  setSubDataOptionsState(updatedSubData);
  setSubDataState(filteredSelectedSubTypes);
};

export const onSubExpTypeChange = (
  newValue: MultiValue<SelectOptionType>,
  setSelectedSubTypes: React.Dispatch<React.SetStateAction<any>>,
  setState: React.Dispatch<React.SetStateAction<ExpenseSaver>>
): void => {
  setSelectedSubTypes(newValue)
  
  const designations = newValue.length > 0 ? newValue.map(o => ({
    libelle: o.label,
    qte: 0,
    prixUnitaire: 0,
    typeId: o.typeId
  })) : []
  
  setState(prevState => ({ ...prevState,  designations }))
}

type DepenseDesignation = {
  libelle: string
  qte: number
  prixUnitaire: number
}

type ExpenseRegroupment = {
  typeId: number
  type: string
  designations: DepenseDesignation[];
}

export const regrouperParTypeDepenses = (data: DesignationBonDeDepense[]): ExpenseRegroupment[] => {
  const map = new Map<number, ExpenseRegroupment>()
  
  if (data.length > 0) {
    for (const item of data) {
      if (item?.fkTypeDepense) {
        const { id, nom } = item.fkTypeDepense
        if (!map.has(id)) {
          map.set(id, {
            typeId: id,
            type: nom.toUpperCase(),
            designations: [],
          });
        }
        
        map.get(id)!.designations.push({
          libelle: item.libelle.toUpperCase(),
          qte: item.qte,
          prixUnitaire: item.prixUnitaire
        });
      } // fin si fkTypeDepense
    }
  }
  
  return Array.from(map.values())
}

export const getTotalDepense = (designations: DesignationBonDeDepense[]): number => {
  let sum = 0
  
  if (designations.length > 0) {
    for (const key in designations) {
      const designation = designations[key]
      const price = designation.prixUnitaire
      const qty = designation.qte
      sum += (price * qty)
    }
  }
  
  return sum
}

export const getSousTotalDepense = (price: number, qty: number): number => (price * qty)

export interface ExpenseFilterResponse extends JsonLdApiResponseInt<Expense[]> {}

export const onGetFilteredExpenseSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  filters: ExpenseFilters,
  setState: React.Dispatch<React.SetStateAction<Expense[]>>,
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPaginated: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (data: ExpenseFilters) => any
): Promise<void> => {
  e.preventDefault()
  setIsPaginated(false)
  setIsFiltered(true)
  
  try {
    const { data, error }: ExpenseFilterResponse = await onSubmit(filters)
    if (data && data.length > 0)
      setState(data)
    else setState([])
    
    if (error && error?.data)
      toast.error(error.data.detail)
  } catch (e) {
    toast.error('Problème réseau.')
  }
  
}
