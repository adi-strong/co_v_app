import {BodyContainer, PageTitles} from "../../../../components";
import {memo} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Card, Col, Row} from "react-bootstrap";
import UniquePatientImageForm from "./UniquePatientImageForm.tsx";
import {useParams} from "react-router-dom";
import {useGetUniquePatientQuery, useUpdatePatientMutation} from "../model/patient.api.slice.ts";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import UniquePatientData from "./UniquePatientData.tsx";
import {ImageLoader} from "../../../../loaders";

const ShowPatient = () => {
  
  useDocumentTitle(`Patient(e)`)
  useActivePage('patients')
  
  const [onUpdatePatient, { isLoading: isEditProfileLoading }] = useUpdatePatientMutation()
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniquePatientQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title={`Patient(e)`}/>
      <Row>
        <Col md={4} className='mb-3'>
          {!(isLoading && isError) && data && (
            <UniquePatientImageForm
              patient={data}
              loader={isLoading}
              onRefresh={onRefresh}
              onSubmit={onUpdatePatient}
              isLoading={isEditProfileLoading}
            />)}
          {isLoading && <ImageLoader/>}
        </Col>
        
        <Col md={8} className='mb-3'>
          <Card>
            <Card.Body>
              {isLoading && <LogoLoader/>}
              {!(isLoading || isError) && data && (
                <UniquePatientData
                  patient={data}
                  onRefresh={onRefresh}
                  isFetching={isFetching}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BodyContainer>
  )
  
}

export default memo(ShowPatient)
