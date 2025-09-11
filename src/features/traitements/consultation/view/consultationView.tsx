import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import ConsultationList from "./ConsultationList.tsx";
import {Card} from "react-bootstrap";
import useSetConsultItems from "../hooks/useSetConsultItems.ts";
import type {Consultation} from "../model/consultationService.ts";
import {useGetConsultationsQuery} from "../model/consultation.api.slice.ts";

const ConsultationView = () => {
  
  useDocumentTitle('Fiches de consultation')
  useActivePage('treats')
  
  const { data, isLoading, isFetching, refetch } = useGetConsultationsQuery('LIST')
  
  const [consults, setConsults] = useState<Consultation[]>([])
  
  useSetConsultItems(data, setConsults)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title='Fiches de consultation'/>
      <Card>
        <ConsultationList
          isFetching={isFetching}
          onRefresh={onRefresh}
          loader={isLoading}
          consultations={consults}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ConsultationView)
