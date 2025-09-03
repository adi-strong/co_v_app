import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import DepartementForm from "./DepartementForm.tsx";
import DepartementsList from "./DepartementsList.tsx";
import type {Service} from "../../service/model/serviceService.ts";
import {useGetDepartementsQuery} from "../model/departement.api.slice.ts";
import useGetDepartmentsItems from "../hooks/useGetDepartmentsItems.ts";

const DepartementView = () => {
  
  useDocumentTitle('Départements')
  useActivePage('agents')
  
  const { data, isLoading, isFetching, refetch } = useGetDepartementsQuery('LIST')
  
  const [departments, setDepartments] = useState<Service[]>([])
  
  useGetDepartmentsItems(data, setDepartments)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Départements'/>
      
      <Row>
        <Col md={4} className='mb-3'>
          <DepartementForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={8} className='mb-3'>
          <DepartementsList
            onRefresh={onRefresh}
            setDepartements={setDepartments}
            departements={departments}
            loader={isLoading}
            isFetching={isFetching}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(DepartementView)
