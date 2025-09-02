import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {memo} from "react";

const ShowCategorieLit = () => {
  
  useDocumentTitle('Catégorie de lits')
  useActivePage('params')
  
  return (
    <BodyContainer>
      <PageTitles title='Catégorie de lits'/>
    </BodyContainer>
  )
  
}

export default memo(ShowCategorieLit)
