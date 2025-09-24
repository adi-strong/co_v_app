import toast from "react-hot-toast";
import type {SelectOptionType} from "../../../../services/services.ts";
import type {ExpenseType} from "../../typesDepenses/model/typesDepensesService.ts";
import {formatDecimalNumberWithSpaces} from "../../../../services/services.ts";
import type {SubDataType} from "../../../../interfaces/SelectFieldInt.ts";
import type {JsonLdApiResponseInt} from "../../../../interfaces/JsonLdApiResponseInt.ts";
import type {User} from "../../../user/model/userService.ts";
import type {CompteCaisse} from "../../compteCaisse/model/compteCaisseService.ts";
import type {Dispatch, SetStateAction} from "react";
import type {MultiValue} from "react-select";

export interface DesignationBonDeDepense {
  '@id'?: string | undefined
  id?: number
  libelle: string,
  qte: number,
  prixUnitaire: number
  fkTypeDepense?: ExpenseType | undefined | null,
}

export interface BonDeDepense {
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
  selected: boolean
  devise: string
  taux: string
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
  demandeur: string
  id: number
  createdAt?: string
  updatedAt?: string
  devise: string
}

export interface ExpenseError {
  designations: string | null
  objet: string | null
  demandeur: string | null
  adresse: string | null
  devise: string | null
}

export interface ExpenseFormModalProps {
  data?: BonDeDepense | undefined | null
  show: boolean
  onHide: () => void
  onRefresh: () => void
}

export interface ExpenseFormModalProps {
  data?: BonDeDepense | undefined | null
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
  devise: '',
})

export const initExpenseErrorState = (): ExpenseError => ({
  designations: null,
  objet: null,
  demandeur: null,
  adresse: null,
  devise: null,
})

const expenseData = (expense: ExpenseSaver): ExpenseSaver => {
  const {
    id,
    objet,
    designations,
    demandeur,
    devise,
  } = expense
  
  const createdAt = expense?.createdAt ? expense.createdAt : null
  
  return {
    id,
    devise,
    demandeur,
    objet,
    designations
  }
}

export const onExpenseSubmit = async (
  state: ExpenseSaver,
  setErrors: Dispatch<SetStateAction<ExpenseError>>,
  onSubmit: (order: ExpenseSaver) => Promise<any>,
  onHide: () => void,
  onRefresh: () => void,
  setState?: Dispatch<SetStateAction<ExpenseSaver>>,
): Promise<void> => {
  setErrors(initExpenseErrorState())
  
  const { id } = state
  const expense = expenseData(state)
  
  try {
    const { data, error }: JsonLdApiResponseInt<BonDeDepense> = await onSubmit(expense)
    
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

export const onExpenseCurrentTotalSum = (expenses: BonDeDepense[]) => {
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
  setState: Dispatch<SetStateAction<any>>,
  setSubDataOptionsState: Dispatch<SetStateAction<SubDataType[]>>,
  setSubDataState: Dispatch<SetStateAction<any>>
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
  setSelectedSubTypes: Dispatch<SetStateAction<any>>,
  setState: Dispatch<SetStateAction<ExpenseSaver>>
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
