import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo, ReactNode, RefObject, useRef} from "react";
import {useGetUniqueApproQuery} from "../model/appro.api.slice.ts";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import {useReactToPrint} from "react-to-print";
import PrintableContent from "../../../../components/PrintableContent.tsx";
import ShowApproToPrint from "./ShowApproToPrint.tsx";

const ShowAppro = () => {
  
  useDocumentTitle('Approvisionnement')
  useActivePage('pharmacy')
  
  const contentRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
  
  const { id } = useParams()
  const { data, isLoading, isError, isFetching, refetch } = useGetUniqueApproQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <BodyContainer>
      <PageTitles title="Document d'approvisionnement"/>
      
      <Row>
        <Col md={6} className='mb-3'>
          <Button size='sm' variant='link' disabled={isFetching} onClick={onRefresh}>
            {!isFetching && (<i className='bi bi-arrow-clockwise me-1' />) as ReactNode}
            {isFetching && (<Spinner className='me-1' animation='grow' size='sm' />) as ReactNode}
            Actualiser
          </Button>
        </Col>
        
        <Col md={6} className='mb-3 text-md-end'>
          <Button size='sm' variant='outline-info' disabled={isFetching} onClick={() => onPrint?.()}>
            <i className='bi bi-printer-fill'/> Imprimer
          </Button>
        </Col>
      </Row>
      
      <Card>
        {!(isError && isLoading) && data && (
          <PrintableContent
            ref={contentRef}
            children={(<ShowApproToPrint appro={data}/>) as ReactNode}
            className='pt-7 px-7 pe-7'
          />
        )}
        
        {isLoading && <LogoLoader/>}
      </Card>
    </BodyContainer>
  )
  
}

export default memo(ShowAppro)
