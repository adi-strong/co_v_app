import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import PrescriptionsList from "./PrescriptionsList.tsx";
import type {Prescription} from "../model/prescriptionService.ts";
import {useGetPrescriptionsQuery} from "../model/prescription.api.slice.ts";
import useSetPrescriptionItems from "../hooks/useSetPrescriptionItems.ts";

const PrescriptionView = () => {
  
  useDocumentTitle('Prescriptions')
  useActivePage('prescriptions')
  
  const { data, isLoading, isFetching, refetch } = useGetPrescriptionsQuery('LIST')
  
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  
  useSetPrescriptionItems(data, setPrescriptions)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Prescriptions' />
      
      <Card>
        <PrescriptionsList
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
          isFetching={isFetching}
          onRefresh={onRefresh}
          loader={isLoading}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(PrescriptionView)
