import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import PatientForm from "./PatientForm.tsx";
import {useGetPatientsQuery} from "../model/patient.api.slice.ts";

const NewPatient = () => {
  
  useDocumentTitle('Nouveau patient')
  useActivePage('patients')
  
  const { refetch } = useGetPatientsQuery('LIST')
  
  return (
    <BodyContainer>
      <PageTitles title='Nouveau patient'/>
      <PatientForm onRefresh={async (): Promise<void> => { await refetch() }}/>
    </BodyContainer>
  )
  
}

export default memo(NewPatient)
