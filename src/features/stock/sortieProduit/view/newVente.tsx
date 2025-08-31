import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {memo} from "react";

export const NewVente = () => {
  
  useDocumentTitle('Vente de produits')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Vente de produits'/>
    </BodyContainer>
  )
}

export default memo(NewVente)
