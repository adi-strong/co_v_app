import {memo} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";

const RapportsProduitView = () => {
  
  useDocumentTitle('Produits perdu')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Rapports de stock'/>
    </BodyContainer>
  )
  
};

export default memo(RapportsProduitView)
