import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Col, Row} from "react-bootstrap";
import StructureForm from "./StructureForm.tsx";
import StructureList from "./StructureList.tsx";
import type {Structure} from "../model/structureService.ts";
import useGetStructuresItems from "../hooks/useGetStructuresItems.ts";
import {useGetStructuresQuery} from "../model/structure.api.slice.ts";

const StructureView = () => {
  
  useDocumentTitle('Structures')
  useActivePage('structures')
  
  const { data, isLoading, isFetching, refetch } = useGetStructuresQuery('LIST')
  
  const [structures, setStructures] = useState<Structure[]>([])
  
  useGetStructuresItems(data, setStructures)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Structures'/>
      
      <Row>
        <Col md={3} className='mb-3'>
          <StructureForm onRefresh={onRefresh}/>
        </Col> {/* Forumulaore */}
        
        <Col md={9} className='mb-3'>
          <StructureList
            setStructures={setStructures}
            onRefresh={onRefresh}
            loader={isLoading}
            isFetching={isFetching}
            structures={structures}
          />
        </Col> {/* Liste */}
      </Row>
    </BodyContainer>
  )
  
};

export default memo(StructureView)
