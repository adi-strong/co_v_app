import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import PatientList from "./PatientList.tsx";
import type {Patient} from "../model/patientService.ts";
import {useGetPatientsQuery} from "../model/patient.api.slice.ts";
import useGetPatientsItems from "../hooks/useGetPatientsItems.ts";

const PatientView = () => {
  
  useDocumentTitle('Patients')
  useActivePage('patients')
  
  const { data, isLoading, isFetching, refetch } = useGetPatientsQuery('LIST')
  
  const [patients, setPatients] = useState<Patient[]>([])
  
  useGetPatientsItems(data, setPatients)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Patients' />
      
      <Card>
        <PatientList
          patients={patients}
          setPatients={setPatients}
          isFetching={isFetching}
          loader={isLoading}
          onRefresh={onRefresh}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(PatientView)
