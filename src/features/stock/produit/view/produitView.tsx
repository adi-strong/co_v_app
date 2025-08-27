import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import ProduitList from "../../lotProduit/view/ProduitList.tsx";

const ProduitView = () => {
  
  useDocumentTitle('Produits')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Produits' />
      
      <Card>
        <ProduitList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ProduitView)
