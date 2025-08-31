import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import FactureProduitList from "./FactureProduitList.tsx";
import {memo} from "react";

const ProductInvoiceView = () => {
  
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
