import type {NavigateFunction} from "react-router-dom";
import toast from "react-hot-toast";
import {setToken} from "./auth.slice";

// *********************************************************************************
// *********************************************************************************
// Interfaces

export interface Credentials {
  username: string
  password: string
}

export interface AuthResponse {
  data: {
    token: string
  };
  error: {
    data: {
      detail: string
    }
  };
}

// End Interfaces
// *********************************************************************************
// *********************************************************************************

// *********************************************************************************
// *********************************************************************************
// Functions

export const initCredentials = (): Credentials => ({ username: '', password: '' })

// End Functions
// *********************************************************************************
// *********************************************************************************

// *********************************************************************************
// *********************************************************************************
// Events

export const onAuthSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  state: Credentials,
  onSubmit: (credentials: Credentials) => Promise<any>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  dispatch: (action: ReturnType<typeof setToken>) => void
): Promise<void> => {
  e.preventDefault();
  setError(null)
  try {
    const { data, error }: AuthResponse = await onSubmit(state);
    if (data) {
      toast.success('Bienvenue')
      dispatch(setToken(data.token))
      // navigate('/app/profile', {replace: true})
    }
    else {
      if (error.data) {
        setError(error.data.detail)
      }
    }
  } catch (e) {
    toast.error('Problème de connexion.')
  }
};

// End Events
// *********************************************************************************
// *********************************************************************************
