import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import ProduitForm from "./ProduitForm.tsx";
import {memo} from "react";

const NewProduit = () => {
  
  useDocumentTitle('Nouveau produit')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouveau produit'/>
      <ProduitForm/>
    </BodyContainer>
  )
}

export default memo(NewProduit)
