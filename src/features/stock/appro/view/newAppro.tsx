import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import ApproForm from "./ApproForm.tsx";

const NewAppro = () => {
  
  useDocumentTitle('Nouvel approvisionnement')
  useActivePage('pharmacy')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouvel approvisionnement'/>
      <ApproForm/>
    </BodyContainer>
  )
  
}

export default memo(NewAppro)
