import type {ChangeEvent, Dispatch, SetStateAction} from "react";
import type {MultiValue} from "react-select";

const TableCSStyle = {
  table: {
    width: '100%'
  },
  th: {
    border: '1px solid #C3C4C7',
    padding: 5,
  },
  tb: {
    backgroundColor: '#FFF',
  }
}

export const tableStyle = {
  table: TableCSStyle.table,
  th: TableCSStyle.th,
}

export const tableWhiteStyle = {
  table: TableCSStyle.table,
  tbody: TableCSStyle.tb,
}

export type SelectRecord = Record<string, string>

export type SelectOptionType = {
  label: string
  value: string
  data?: string
  id?: number | null
  typeId?: number | null
  subData?: MultiValue<SelectOptionType>
}

export type SelectType = { option: string }

export type THeadItemType = { th: string }

export type TabType = { title: string, event: string, count: number }

export interface TabInt { title: string, event: string }


// ******************************************* ******************************************** //
// ******************************************* ******************************************** //


// INIT

export const initBasketActionOptions: SelectOptionType[] = [
  { label: '-- Actions groupés --', value: 'NONE' },
  { label: 'Restaurer', value: 'ON_DELETE' },
  { label: 'Supprimer définitivement', value: 'ON_DELETE' },
]

export const formatNumberWithSpaces = (value: string | number): string => {
  const str = String(value).replace(',', '.');
  const [intPart, decimalPart] = str.split('.');
  
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
  return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
}

export const subStr = (str: string, limit: number): string =>
  str.length <= limit ? str : `${str.substring(0, limit)} ...`

export const onMouseEnterEvent = (index: number): void => {
  const tdParent = document.querySelector(`#item-${index}`)
  const actionsElt: HTMLElement = tdParent?.querySelector(`#actions-${index}`) as HTMLElement
  
  if (actionsElt) {
    actionsElt.hidden = false
  }
}

export const onMouseLeaveEvent = (index: number): void => {
  const tdParent = document.querySelector(`#item-${index}`)
  const actionsElt: HTMLElement = tdParent?.querySelector(`#actions-${index}`) as HTMLElement
  
  if (actionsElt) {
    actionsElt.hidden = true
  }
}

export const handleShow = (setShow: Dispatch<SetStateAction<boolean>>): void => setShow(prev => !prev)

export const selectAllStateItems = (
  isSelectedAll: boolean,
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>,
  setState: Dispatch<SetStateAction<object[]>>
): void => {
  const select = !isSelectedAll
  setIsSelectedAll(select)
  setState(prev => prev.map(data => ({
    ...data,
    selected: select
  })))
}

export const setSelectedDataItem = (index: number, setState: Dispatch<SetStateAction<object[]>>): void => {
  setState(prev => prev.map((data, i) => {
    if (i === index) data = { ...data, selected: !prev[i].selected }
    return data
  }))
}

export const onGetRandomPasswordText = (length: number, setState: Dispatch<SetStateAction<object>>): void => {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  let result = ''
  for (let i: number = 0; i < length; i++) {
    const index: number = Math.floor(Math.random() * characters.length);
    result += characters[index];
  }
  
  setState(prev => ({ ...prev, password: result }))
}

export const formatDecimalNumberWithSpaces = (value: string | number): string => {
  const number = typeof value === 'number' ? value : parseFloat(value.toString().replace(',', '.'));
  if (isNaN(number)) return '';
  
  const [intPart, decimalPart] = number.toFixed(2).split('.');
  
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
  return `${formattedInt}.${decimalPart}`;
}

export const onSideMenuToggle = (state: boolean, setState: Dispatch<SetStateAction<boolean>>): void => {
  const dbWrapper: Element = document.querySelector('#db-wrapper')
  const show: boolean = !state
  
  if (show)
    dbWrapper.classList.add('toggled')
  else
    dbWrapper.classList.remove('toggled')
  
  setState(show)
}

export type PriceType = { prixHt: number, prixTtc: number, taxe: number }
export const onSetPrixHtChange = (e: ChangeEvent<HTMLInputElement>, tax: number): PriceType => {
  
  const value: string = e.target.value
  
  let prixTtc: number
  const taxe: number = isNaN(tax) ? 0 : tax
  const prixHt: number = isNaN(Number(value)) || Number(value) < 0.00 ? 0 : Number(value)
  
  if (taxe > 0.00) {
    const plusValue: number = (prixHt * taxe) / 100
    prixTtc = prixHt + plusValue
  } else prixTtc = prixHt
  
  return { prixHt, prixTtc, taxe }
  
}

export const onSetTaxChange = (e: ChangeEvent<HTMLInputElement>, tax: number, ht: number): PriceType => {
  
  const value: string = e.target.value
  
  const taxe: number = isNaN(Number(value)) || Number(value) < 0.00 ? 0 : Number(value)
  
  let prixTtc: number
  const prixHt: number = ht
  
  if (taxe > 0.00) {
    const plusValue: number = (prixHt * taxe) / 100
    prixTtc = prixHt + plusValue
  } else prixTtc = prixHt
  
  return { prixHt, prixTtc, taxe }
  
}

export const getSexOptions = (): SelectOptionType[] => [
  { label: '-- Aucune option sélectionnée --', value: '' },
  { label: 'Homme', value: 'H' },
  { label: 'Femme', value: 'F' },
]

// END INIT

// ******************************************* ******************************************** //
// ******************************************* ******************************************** //
