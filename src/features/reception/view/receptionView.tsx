import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles} from "../../../components";
import {Card} from "react-bootstrap";
import ReceptionList from "./ReceptionList.tsx";

const ReceptionView = () => {
  
  useDocumentTitle('Réception')
  useActivePage('home')
  
  return (
    <BodyContainer>
      <PageTitles title='Réception' />
      
      <Card>
        <ReceptionList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ReceptionView)
