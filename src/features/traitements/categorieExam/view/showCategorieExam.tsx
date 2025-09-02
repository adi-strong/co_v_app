import {BodyContainer, PageTitles} from "../../../../components";
import {memo} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";

const ShowCategorieExam = () => {
  
  useDocumentTitle('Catégorie des examens')
  useActivePage('params')
  
  return (
    <BodyContainer>
      <PageTitles title='Catégorie des examens'/>
    </BodyContainer>
  )
  
}

export default memo(ShowCategorieExam)
