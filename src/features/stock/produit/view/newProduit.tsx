import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import ProduitForm from "./ProduitForm.tsx";
import {memo} from "react";
import {useGetProduitsQuery} from "../model/produit.api.slice.ts";

const NewProduit = () => {
  
  useDocumentTitle('Nouveau produit')
  useActivePage('pharmacy')
  
  const { refetch } = useGetProduitsQuery('LIST')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouveau produit'/>
      <ProduitForm onRefresh={async (): Promise<void> => { await refetch() }}/>
    </BodyContainer>
  )
}

export default memo(NewProduit)
