import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {Card} from "react-bootstrap";
import {BodyContainer, PageTitles} from "../../../components";
import UsersList from "./UsersList.tsx";

const UserView = () => {
  
  useDocumentTitle('Utilisateurs')
  useActivePage('accounts')
  
  return (
    <BodyContainer>
      <PageTitles title='Utilisateurs' />
      
      <Card>
        <UsersList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(UserView)
