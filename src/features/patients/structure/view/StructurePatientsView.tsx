import {useGetStructurePatientsQuery} from "../../patient/model/patient.api.slice.ts";
import {useState} from "react";
import type {Patient} from "../../patient/model/patientService.ts";
import useGetPatientsItems from "../../patient/hooks/useGetPatientsItems.ts";
import PatientList from "../../patient/view/PatientList.tsx";

export default function StructurePatientsView({ structureId }: { structureId: number }) {
  
  const { data, isLoading, isFetching, refetch } = useGetStructurePatientsQuery(structureId)
  
  const [patients, setPatients] = useState<Patient[]>([])
  
  useGetPatientsItems(data, setPatients)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <>
      <PatientList
        patients={patients}
        setPatients={setPatients}
        isFetching={isFetching}
        loader={isLoading}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
