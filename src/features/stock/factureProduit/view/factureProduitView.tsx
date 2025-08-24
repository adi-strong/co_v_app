import {memo} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import FactureProduitList from "./FactureProduitList.tsx";
import {Card} from "react-bootstrap";
import {useActivePage, useDocumentTitle} from "../../../../hooks";

const FactureProduitView = () => {
  
  useDocumentTitle('Factures des produits pharmaceutiques')
  useActivePage('invoices')

  return (
    <BodyContainer>
      <PageTitles title='Factures des produits pharmaceutiques' />
      
      <Card>
        <FactureProduitList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(FactureProduitView)
