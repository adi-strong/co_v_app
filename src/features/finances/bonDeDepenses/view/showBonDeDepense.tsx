import {memo, ReactNode, useRef} from "react";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {useParams} from "react-router-dom";
import {useGetUniqueBonDepenseQuery} from "../model/bonDeDepenses.api.slice.ts";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {useReactToPrint} from "react-to-print";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import UniqueBonDeDepenseDetails from "./UniqueBonDeDepenseDetails.tsx";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {BodyContainer} from "../../../../components";

const ShowBonDeDepense = () => {
  
  useDocumentTitle('Bon de dépenses')
  useActivePage('finances')
  
  const contentRef = useRef<HTMLDivElement | null>(null)
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueBonDepenseQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <BodyContainer>
      <Row>
        <Col md={6} className='mb-3'>
          <Button size='sm' disabled={isLoading} variant='link' onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1' />) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm' />) as ReactNode}
            Actualiser
          </Button>
        </Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Button size='sm' disabled={isLoading} variant='outline-info' onClick={() => onPrint?.()}>
            <i className='bi bi-printer-fill' /> Imprimer
          </Button>
        </Col>
      </Row>
      
      <Card>
        <PrintableContent ref={contentRef} className='pt-8 px-7 pe-7'>
          {!(isError && isLoading) && data && <UniqueBonDeDepenseDetails expense={data}/>}
        </PrintableContent>
        
        {isLoading && <LogoLoader/>}
      </Card>
    </BodyContainer>
  )
  
}

export default memo(ShowBonDeDepense)
