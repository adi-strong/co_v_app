import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import PatientForm from "./PatientForm.tsx";

const NewPatient = () => {
  
  useDocumentTitle('Nouveau patient')
  useActivePage('patients')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouveau patient'/>
      <PatientForm/>
    </BodyContainer>
  )
  
}

export default memo(NewPatient)
