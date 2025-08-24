import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles} from "../../../components";
import RdvForm from "./RdvForm.tsx";
import {memo} from "react";

const NewRdv = () => {
  
  useDocumentTitle('Nouveau rendez-vous')
  useActivePage('home')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouveau rendez-vous'/>
      <RdvForm/>
    </BodyContainer>
  )
  
}

export default memo(RdvForm)
