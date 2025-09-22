import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";
import { useParams} from "react-router-dom";
import {useGetUniqueAgentQuery, useUpdateAgentProfileMutation} from "../model/agent.api.slice.ts";
import {Card, Col, Row} from "react-bootstrap";
import {ImageLoader} from "../../../../loaders";
import UniqueAgentData from "./UniqueAgentData.tsx";
import UniqueAgentImageForm from "./UniqueAgentImageForm.tsx";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";

const ShowAgent = () => {
  
  useDocumentTitle('Agent')
  useActivePage('agents')
  
  const [onUpdateAgent, { isLoading: isEditProfileLoading }] = useUpdateAgentProfileMutation()
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueAgentQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Agent'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          {!(isLoading && isError) && data && (
            <UniqueAgentImageForm
              agent={data}
              loader={isLoading}
              onRefresh={onRefresh}
              onSubmit={onUpdateAgent}
              isLoading={isEditProfileLoading}
            />)}
          {isLoading && <ImageLoader/>}
        </Col>
        
        <Col md={8} className='mb-3'>
          <Card>
            <Card.Body>
              {isLoading && <LogoLoader/>}
              {!(isLoading && isError) && data && (
                <UniqueAgentData
                  agent={data}
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

export default memo(ShowAgent)
