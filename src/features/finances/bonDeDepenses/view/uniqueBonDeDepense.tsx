import {memo, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {useActivePage, useDocumentTitle, useGetUserRoles} from "../../../hooks";
import {useReactToPrint} from "react-to-print";
import {useGetUniqueExpenseQuery} from "../model/bonDeDepenses.api.slice";
import {AuthorizedPage, PageTitle, PrintableContent} from "../../../components";
import {Alert, Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {LogoLoader} from "../../../loaders";
import {getErrorMessage} from "../../../services";
import UniquePrintableBdp from "./UniquePrintableBdp";

const UniqueBonDeDepense = () => {
  
  const contentRef = useRef<HTMLDivElement>(null)
  
  const { id } = useParams()
  
  useDocumentTitle(`Bons de dépenses N° ${id}`)
  useActivePage('finances')
  
  const allowedRoles = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']
  
  const onUserRoles = useGetUserRoles()
  
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetUniqueExpenseQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  const onPrint = useReactToPrint({
    contentRef
  })
  
  return (
    <AuthorizedPage
      userRoles={onUserRoles()}
      allowedRoles={allowedRoles}
      title='Bon de Dépenses'
      children={(
        <Container fluid className='p-6'>
          <PageTitle title={`Bons de dépenses N° ${id}`} />
          <Row>
            <Col className='mb-2'>
              <Link to='/app/bons-de-depenses' className='btn btn-sm btn-link'>
                <i className='bi bi-arrow-left'/> Retour à la liste
              </Link>|
              <Button size='sm' disabled={isFetching || isLoading} variant='link' onClick={onRefresh}>
                {!isFetching && <i className='bi bi-arrow-clockwise me-1'/>}
                {isFetching && <Spinner className='me-1' animation='border' size='sm'/>}
                {isFetching ? 'Chargement en cour' : 'Actualiser'}
              </Button>
            </Col>
            
            <Col className='mb-2 text-md-end'>
              <Button size='sm' variant='outline-primary' disabled={isFetching || isLoading} onClick={() => onPrint?.()}>
                <i className='bi bi-printer'/> Imprimer
              </Button>
            </Col>
          </Row>
          
          <Card>
            <Card.Body>
              {!(isError && isLoading) && data && (
                <PrintableContent ref={contentRef}>
                  <UniquePrintableBdp expense={data} />
                </PrintableContent>
              )}
              
              {isLoading && <LogoLoader/>}
              
              {isError &&
                <Alert variant='danger' dismissible>
                  {getErrorMessage(error)}
                </Alert>}
            </Card.Body>
          </Card>
        </Container>
      )}
    />
  )
  
}

export default memo(UniqueBonDeDepense)
