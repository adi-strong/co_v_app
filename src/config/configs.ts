import type {AppHeaderInt} from "../interfaces/AppHeaderInt.ts";
import type {MethodInt} from "../interfaces/MethodInt.ts";
import type {CurrencyInt} from "../interfaces/CurrencyInt.ts";

export type CurrencyType = {
  first: CurrencyInt
  last: CurrencyInt
}

export const getCurrencies = (): CurrencyType => {
  return {
    first: {
      label: 'DR Congo (CDF)',
      value: 'DR Congo (CDF)',
      flag: 'https://flagcdn.com/cd.svg',
      image: 'https://flagcdn.com/cd.svg',
      symbol: 'FC',
      code: 'CDF',
    },
    
    last: {
      label: 'United States (USD)',
      value: 'United States (USD)',
      flag: 'https://flagcdn.com/us.svg',
      image: 'https://flagcdn.com/us.svg',
      symbol: '$',
      code: 'USD',
    },
  }
}

export const APP_HEADERS: AppHeaderInt = {
  PATCH_HEADERS: {
    Accept: 'application/ld+json',
    'Content-Type': 'application/merge-patch+json',
  },
  POST_HEADERS: {
    Accept: 'application/ld+json',
    'Content-Type': 'application/ld+json',
  },
}

export const APP_METHODS: MethodInt = {
  POST: 'POST',
  DELETE: 'DELETE',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT',
}

export const APP_ENTRYPOINT: string = 'https://localhost:8000'
// export const APP_ENTRYPOINT: string = 'https://localhost:8001'

export const API_PATH: string = '/api'
