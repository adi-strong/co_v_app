import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import ConsultForm from "./ConsultForm.tsx";

const NewConsult = () => {
  
  useDocumentTitle('Nouvelle fiche de consultation')
  useActivePage('treats')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouvelle fiche de consultation'/>
      <ConsultForm/>
    </BodyContainer>
  )
  
}

export default memo(NewConsult)
