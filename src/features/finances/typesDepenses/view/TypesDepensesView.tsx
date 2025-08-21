import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle, useGetUserRoles} from "../../../hooks";
import {ParamsLayout} from "../../../layouts";
import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {AuthorizedPage, SideContent} from "../../../components";
import TypesDepensesForm from "./TypesDepensesForm";
import {useGetExpenseTypesQuery} from "../model/typesDepenses.api.slice";
import {RepeatableTableRows} from "../../../loaders";
import TypesDepensesList from "./TypesDepensesList";
import {getErrorMessage} from "../../../services";
import {DataTableFilterMeta} from "primereact/datatable";
import {FilterMatchMode} from "primereact/api";
import {onGlobalAgentFilterChange} from "../../agents/model/agentsService";

const TypesDepensesView = () => {
  
  useDocumentTitle('Types de dépenses')
  useActivePage('configurations')
  
  const allowedRoles = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']
  
  const onUserRoles = useGetUserRoles()
  
  const [show, setShow] = useState<boolean>(false)
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nom: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
  
  const {
    data: types = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetExpenseTypesQuery('LIST')
  
  const onShow = (): void => setShow(!show)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <AuthorizedPage
      userRoles={onUserRoles()}
      allowedRoles={allowedRoles}
      title='Types de Dépenses'
      children={(
        <Container fluid className='p-6'>
          <ParamsLayout
            title='Types de dépenses'
            label='Types de dépenses'
            subTitle='Gestion des Types de Dépenses'
            children={(
              <Card>
                <Card.Body>
                  <Row className='mb-6'>
                    <Col md={6} className='mb-1'>
                      <h4 className='mb-1'>
                        {!isFetching && <i className='bi bi-arrow-clockwise me-1 cursor-pointer text-primary' onClick={onRefresh}/>}
                        {isFetching && <Spinner className='text-primary me-1' animation='grow' size='sm'/>}
                        Gestion des Types de Dépenses</h4>
                    </Col>
                    
                    <Col md={6} className='mb-1 text-md-end'>
                      <Row>
                        <Col md={6} className='mb-1'>
                          <Form.Control
                            name='filter'
                            onChange={e => onGlobalAgentFilterChange(
                              e,
                              filters,
                              setFilters,
                              setGlobalFilterValue
                            )}
                            placeholder='Mots clés (Filtres)'
                            value={globalFilterValue}
                            size='sm'
                          />
                        </Col>
                        
                        <Col md={6} className='mb-1'>
                          <Button
                            variant='outline-primary'
                            onClick={onShow}
                            size='sm'
                          >
                            Ajout de types <i className='bi bi-plus'/>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  
                  <TypesDepensesList types={types}  onRefresh={onRefresh} isFetching={isFetching} filters={filters}/>
                  {isLoading && <div className='mt-3'><RepeatableTableRows /></div>}
                  
                  {isError && (
                    <div className='mt-3'>
                      <Alert variant='danger' className='text-center' dismissible>
                        {getErrorMessage(error)}
                      </Alert>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
          />
          
          <SideContent
            title='Ajout du type de dépenses'
            onHide={onShow}
            show={show}
            placement='end'
            icon='plus'
            children={<TypesDepensesForm onHide={onShow}  onRefresh={onRefresh}/>}
          />
        </Container>
      )}
    />
  );
  
};

export default memo(TypesDepensesView);
