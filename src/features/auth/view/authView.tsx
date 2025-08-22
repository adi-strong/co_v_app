import {memo} from 'react';
import AuthForm from "./AuthForm.tsx";
import {useDocumentTitle} from "../../../hooks";

const AuthView = () => {
  
  useDocumentTitle('Authentification')

  return <AuthForm />
  
};

export default memo(AuthView)
