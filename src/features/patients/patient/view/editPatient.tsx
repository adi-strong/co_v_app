import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import PatientForm from "./PatientForm.tsx";
import {getPatientFakeData} from "../model/patientService.ts";
import {memo} from "react";

const EditPatient = () => {
  
  useDocumentTitle('Modifier un(e) patient(e)')
  useActivePage('patients')
  
  return (
    <BodyContainer>
      <PageTitles title='Modifier un(e) patient(e)'/>
      <PatientForm data={getPatientFakeData()[0]}/>
    </BodyContainer>
  )
  
}

export default memo(EditPatient)
