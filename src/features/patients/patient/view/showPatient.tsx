import {BodyContainer, PageTitles} from "../../../../components";
import {memo} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";

const ShowPatient = () => {
  
  useDocumentTitle(`Patient(e)`)
  useActivePage('patients')
  
  return (
    <BodyContainer>
      <PageTitles title={`Patient(e)`}/>
    </BodyContainer>
  )
  
}

export default memo(ShowPatient)
