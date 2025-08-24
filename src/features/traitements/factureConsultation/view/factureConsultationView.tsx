import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import FactureConsultList from "./FactureConsultList.tsx";

const FactureConsultationView = () => {
  
  useDocumentTitle('Factures des fiches de consultations')
  useActivePage('invoices')
  
  return (
    <BodyContainer>
      <PageTitles title='Factures des fiches de consultations' />
      
      <Card>
        <FactureConsultList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(FactureConsultationView)
