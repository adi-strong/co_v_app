import {memo} from "react";
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles} from "../../../components";
import ReceptionForm from "./ReceptionForm.tsx";

const NewReception = () => {
  
  useDocumentTitle('Nouvel enregistrement de présence')
  useActivePage('home')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouvel enregistrement de présence / Fiche de réception'/>
      <ReceptionForm/>
    </BodyContainer>
  )
  
}

export default memo(NewReception)
