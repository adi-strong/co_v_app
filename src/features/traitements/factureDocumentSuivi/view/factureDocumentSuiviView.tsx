import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import FactureDocList from "./FactureDocList.tsx";

const FactureDocumentSuiviView = () => {
  
  useDocumentTitle('Factures des traitements suivi')
  useActivePage('invoices')
  
  return (
    <BodyContainer>
      <PageTitles title='Factures des traitements suivi' />
      
      <Card>
        <FactureDocList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(FactureDocumentSuiviView)
