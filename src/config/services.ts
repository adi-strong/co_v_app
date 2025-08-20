import type {AppHeaderInt} from "../interfaces/AppHeaderInt.ts";
import type {MethodInt} from "../interfaces/MethodInt.ts";

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

export const API_PATH: string = '/api'
