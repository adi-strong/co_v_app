import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import PatientForm from "./PatientForm.tsx";
import {memo} from "react";
import {useGetUniquePatientQuery} from "../model/patient.api.slice.ts";
import {useParams} from "react-router-dom";

const EditPatient = () => {
  
  useDocumentTitle('Modifier un(e) patient(e)')
  useActivePage('patients')
  
  const { id } = useParams()
  const { data, isFetching, refetch } = useGetUniquePatientQuery(id)
  
  return (
    <BodyContainer>
      <PageTitles title='Modifier un(e) patient(e)'/>
      <PatientForm data={data} loader={isFetching} onRefresh={async (): Promise<void> => { await refetch() }}/>
    </BodyContainer>
  )
  
}

export default memo(EditPatient)
