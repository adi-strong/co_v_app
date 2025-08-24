import {memo} from "react";
import {BodyContainer, PageTitles} from "../../../components";
import {useActivePage, useDocumentTitle} from "../../../hooks";
import UserForm from "./UserForm.tsx";

const NewUser = () => {
  
  useDocumentTitle('Nouveau compte utilisateur')
  useActivePage('accounts')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouveau compte utilisateur'/>
      <UserForm/>
    </BodyContainer>
  )
  
}

export default memo(NewUser)
