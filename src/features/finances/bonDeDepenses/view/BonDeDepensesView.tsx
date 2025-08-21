import {memo} from 'react';
import {useActivePage, useDocumentTitle, useGetUserRoles} from "../../../hooks";
import {AuthorizedPage, PageTitle} from "../../../components";
import {Card, Container} from "react-bootstrap";
import ExpensesList from "./ExpensesList";

const BonDeDepensesView = () => {
  
  useDocumentTitle('Bons de dépenses')
  useActivePage('finances')
  
  const allowedRoles = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']
  
  const onUserRoles = useGetUserRoles()
  
  return (
    <AuthorizedPage
      userRoles={onUserRoles()}
      allowedRoles={allowedRoles}
      title='Bon de Dépenses'
      children={(
        <Container fluid className='p-6'>
          <PageTitle title='Bons de dépenses' />
          <Card>
            <Card.Body>
              <ExpensesList />
            </Card.Body>
          </Card>
        </Container>
      )}
    />
  );
  
};

export default memo(BonDeDepensesView);
