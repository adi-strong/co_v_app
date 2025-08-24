import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import FournisseurList from "./FournisseurList.tsx";

const FournisseurView = () => {
  
  useDocumentTitle('Fournisseurs')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Fournisseurs' />
      
      <Card>
        <FournisseurList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(FournisseurView)
