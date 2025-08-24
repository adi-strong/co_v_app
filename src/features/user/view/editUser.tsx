import {memo} from "react";
import {BodyContainer, PageTitles} from "../../../components";
import {useActivePage, useDocumentTitle} from "../../../hooks";
import UserForm from "./UserForm.tsx";
import {getUserFakeData} from "../model/userService.ts";

const EditUser = () => {
  
  useDocumentTitle('Modifier un compte utilisateur')
  useActivePage('accounts')
  
  return (
    <BodyContainer>
      <PageTitles title='Modifier un compte utilisateur'/>
      <UserForm data={getUserFakeData()[0]}/>
    </BodyContainer>
  )
  
}

export default memo(EditUser)
