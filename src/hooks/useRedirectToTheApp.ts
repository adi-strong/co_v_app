import type {NavigateFunction} from "react-router-dom";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function useRedirectToTheApp(token: string|null, navigate: NavigateFunction) {
  
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/app/profil'
  
  useEffect((): void => {
    if (token) {
      navigate(from, { replace: true })
    }
  }, [from, navigate, token])
  
}
