import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import DocumentForm from "./DocumentForm.tsx";
import {memo} from "react";

const NewDocument = () => {
  
  useDocumentTitle('Nouvelle fiche de suivi du patient')
  useActivePage('treats')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouvelle fiche de suivi du patient'/>
      <DocumentForm/>
    </BodyContainer>
  )
  
}

export default memo(NewDocument)
