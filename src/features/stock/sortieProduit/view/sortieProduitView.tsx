import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import SortieProdList from "./SortieProdList.tsx";
import {Card} from "react-bootstrap";

const SortieProduitView = () => {
  
  useDocumentTitle('Mouvements en stock')
  useActivePage('pharmacy')

  return (
    <BodyContainer>
      <PageTitles title='Mouvements en stock'/>
      <Card>
        <SortieProdList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(SortieProduitView)
