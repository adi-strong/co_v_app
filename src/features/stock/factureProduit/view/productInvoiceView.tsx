import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import FactureProduitList from "./FactureProduitList.tsx";
import {memo} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";

const ProductInvoiceView = () => {
  
  useDocumentTitle('Facture des produits pharmaceutiques')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Factures des produits pharmaceutiques' />
      
      <Card>
        <FactureProduitList />
      </Card>
    </BodyContainer>
  )
  
}

export default memo(ProductInvoiceView)
