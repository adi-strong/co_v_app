import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import HospList from "./HospList.tsx";
import {useGetHospitalisationsQuery} from "../model/hospitalisation.api.slice.ts";
import type {Hospitalisation} from "../model/hospitalisationService.ts";
import useSetHospItems from "../hooks/useSetHospItems.ts";

const HospitalisationView = () => {
  
  useDocumentTitle('Hospitalisation')
  useActivePage('treats')
  
  const { data, isLoading, isFetching, refetch } = useGetHospitalisationsQuery('LIST')
  
  const [hosps, setHosps] = useState<Hospitalisation[]>([])
  
  useSetHospItems(data, setHosps)
  
  const onRefresh = async (): Promise<void> => { await refetch() }

  return (
    <BodyContainer>
      <PageTitles title="List des fiches d'hospitalisations"/>
      <Card>
        <HospList
          hosps={hosps}
          loader={isLoading}
          onRefresh={onRefresh}
          isFetching={isFetching}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(HospitalisationView)
