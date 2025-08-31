import {memo} from 'react';
import {Card} from "react-bootstrap";
import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import PerteProdList from "./PerteProdList.tsx";

const PerteProduitView = () => {
  
  useDocumentTitle('Produits perdu')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Produits perdu'/>
      <Card>
        <PerteProdList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(PerteProduitView)
