import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Alert, Button, ButtonGroup, Col, Dropdown, Row, Spinner} from "react-bootstrap";
import {useRef, useState} from "react";
import {
  Expense, ExpenseToExport, initExpenseFilters, onExpenseCloseDeleteModal, onExpenseCloseEditModal,
  onExpenseCurrentTotalSum,
  onExpenseOpenDeleteModal,
  onExpenseOpenEditModal, onGetFilteredExpenseSubmit
} from "../model/bonDeDepensesService";
import {
  totalExpensesItems, totalExpensesPages,
  useGetExpensesQuery, useGetFilteredExpensesMutation,
  useLazyGetPaginateExpensesQuery
} from "../model/bonDeDepenses.api.slice";
import EditExpenseFormModal from "./EditExpenseFormModal";
import DeleteBonDeDepenseModal from "./DeleteBonDeDepenseModal";
import {
  expenseCategories,
  expenseCreatedAt,
  expenseDemandeur,
  expenseSubTotal,
  expenseTitleBody
} from "../model/expensesTemplates";
import {useNavigate} from "react-router-dom";
import {TextField} from "../../../components";
import {handleChange} from "../../../services/form.handler.service";
import {
  useGetExpensesTypesOptions,
  useGetPaginatedExpensesData,
} from "../../../hooks";
import AwaitSingleSelectField from "../../../components/forms/AwaitSingleSelectField";
import {RepeatableTableRows} from "../../../loaders";
import {
  ExportButtonKey,
  exportButtonLabel,
  formatNumberWithSpaces,
  getErrorMessage,
  handleExportButton
} from "../../../services";
import PostNewExpenseModal from "./PostNewExpenseModal";
import {PaginatorLayout2} from "../../../layouts";
import {useReactToPrint} from "react-to-print";
import useGetExpenseDataToExport from "../../../hooks/useGetExpenseDataToExport";

export default function ExpensesList() {
  
  const [show, setShow] = useState<boolean>(false)
  
  const [filterItems, setFilterItems] = useState<Expense[]>([])
  const [paginatedItems, setPaginatedItems] = useState<Expense[]>([])
  const [isPaginated, setIsPaginated] = useState<boolean>(false)
  const [isFiltered, setIsFiltered] = useState<boolean>(false)
  
  const {
    data: expenses = [],
    isLoading,
    isError,
    isFetching,
    error,
    refetch
  } = useGetExpensesQuery('LIST')
  
  const [exp, setExp] = useState<ExportButtonKey>('EXPORT')
  
  
  const contentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const footer = (
    <>
      <hr/>
      
      <div className='fw-bold d-flex justify-content-between'>
        <span>TOTAL</span>
        <span>
          {onExpenseCurrentTotalSum(
            isPaginated
              ? paginatedItems
              : isFiltered
                ? filterItems
                : expenses
          )}
        </span>
      </div>
      
      <hr/>
      
      Il y a au total {isFiltered
      ? formatNumberWithSpaces(filterItems.length)
      : formatNumberWithSpaces(totalExpensesItems)} lignes trouvées.
    </>
  )
  
  const [isEdited, setIsEdited] = useState<Expense | null>(null)
  const [isDeleted, setIsDeleted] = useState<Expense | null>(null)
  const [filters, setFilters] = useState(initExpenseFilters())
  const [page, setPage] = useState<number>(1)
  const [first, setFirst] = useState<number>(0)
  const [rows, setRows] = useState<number>(10)
  
  const [getPaginateExpenses, {
    data: paginatedData = [],
    isFetching: isPaginateFetching,
    isSuccess: isPaginateSuccess,
    isError: isPaginateError,
  }] = useLazyGetPaginateExpensesQuery()
  
  const [getFilteredExpenses, {
    isLoading: isFilterLoading,
  }] = useGetFilteredExpensesMutation()
  
  const expensesOptions = useGetExpensesTypesOptions(true)
  
  const onShow = (): void => { setShow(!show) }
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  const handleRefresh = async (): Promise<void> => {
    if (!isFiltered && isPaginated) {
      await getPaginateExpenses(`?page=${page}`)
    } else {
      setFilters(initExpenseFilters())
      onRefresh()
    }
  }
  
  const handleRefreshAll = (): void | Promise<void> => {
    setIsPaginated(false)
    setIsFiltered(false)
    setFirst(0)
    setRows(10)
    setPage(1)
    onRefresh()
  }
  
  const expensesActionsBody = (expense: Expense) => {
    return (
      <div className='text-center'>
        <Dropdown
          className='p-0'
          children={(
            <>
              <Dropdown.Toggle className='bg-transparent border-0 p-0'>
                <i className='bi bi-three-dots-vertical text-dark' />
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Item
                  className='cursor-pointer'
                  onClick={() => {
                    navigate(`/app/bons-de-depenses/${expense.id}/${expense?.slug}`)
                  }}>
                  <i className='bi bi-eye'/> Voir
                </Dropdown.Item>
                
                <Dropdown.Item
                  className='cursor-pointer text-primary'
                  onClick={(): void => onExpenseOpenEditModal(expense, setIsEdited)}>
                  <i className='bi bi-pencil-square'/> Modifier
                </Dropdown.Item>
                
                <Dropdown.Item
                  className='cursor-pointer text-danger'
                  onClick={(): void => onExpenseOpenDeleteModal(expense, setIsDeleted)}>
                  <i className='bi bi-trash'/> Supprimer
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        />
      </div>
    )
  }
  
  // Get Filtered Data Items
  useGetPaginatedExpensesData(paginatedData, isPaginateSuccess, isPaginateError, setPaginatedItems)
  // End Get Filtered Data Items
  
  // Handle Data To Export
  const dataToExport = useGetExpenseDataToExport(
    isPaginated
      ? paginatedItems
      : isFiltered
        ? filterItems
        : expenses
  )
  // End Handle Data To Export
  
  const onPrint = useReactToPrint({
    contentRef
  })
  // End Handle Data To Export
  
  return (
    <>
      <Row>
        <Col className='mb-2'>
          <Button
            disabled={isFetching || isPaginateFetching || isFilterLoading}
            size='sm'
            variant='link'
            onClick={onRefresh}
            title='Actualiser'
          >
            {!(isFetching || isPaginateFetching || isFilterLoading) && <i className='bi bi-arrow-clockwise me-1 text-primary'/>}
            {(isFetching || isPaginateFetching || isFilterLoading) && <Spinner className='text-primary me-1' animation='grow' size='sm'/>}
            Actualiser
          </Button>
        </Col>
        
        <Col className='mb-2 text-md-end'>
          {!isFiltered &&
            <Button onClick={onShow} variant='outline-primary' size='sm' className='me-1'>
              Nouveau bon de dépenses <i className='bi bi-plus'/>
            </Button>}
          
          {isFiltered &&
            <Button disabled onClick={() => { }} variant='outline-primary' size='sm' className='me-1'>
              Nouveau bon de dépenses <i className='bi bi-plus'/>
            </Button>}
          
          <Dropdown as={ButtonGroup} children={(
            <>
              <Button
                size='sm'
                variant='outline-dark'
                onClick={() => {
                  if (exp === 'EXPORT')
                    handleExportButton<ExpenseToExport>(
                      exp,
                      setExp,
                      dataToExport,
                      'bon_de_depenses',
                      onExpenseCurrentTotalSum(
                        isPaginated ? paginatedItems :
                          isFiltered ? filterItems : expenses
                      )
                    )
                  else onPrint()
                }}>
                <i className={`bi bi-${exp === 'EXPORT' ? 'download' : 'printer'}`}/> {exportButtonLabel[exp]}
              </Button>
              
              <Dropdown.Toggle split variant='outline-dark' size='sm' className='bi bi-caret-down' />
              
              <Dropdown.Menu>
                <Dropdown.Item onClick={() =>
                  handleExportButton<ExpenseToExport>(
                    exp,
                    setExp,
                    dataToExport,
                    'bon_de_depenses',
                    onExpenseCurrentTotalSum(
                      isPaginated ? paginatedItems :
                        isFiltered ? filterItems : expenses
                    )
                  )}>Exporter</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                  setExp('PRINT')
                  onPrint()
                }}>Imprimer</Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}/>
        </Col>
      </Row>
      
      <div className='px-2 mb-3'><i className='bi bi-filter'/> Filtres :</div>
      
      <form onSubmit={e => onGetFilteredExpenseSubmit(
        e,
        filters,
        setFilterItems,
        setIsFiltered,
        setIsPaginated,
        getFilteredExpenses
      )} className='mb-3 row'>
        <Col className='mb-3' md={6}>
          <Row>
            <Col className='mb-2'>
              <TextField
                disabled={isLoading || isFilterLoading}
                type='date'
                name='startAt'
                value={filters.startAt}
                onChange={e => handleChange(e, filters, setFilters)}
              />
            </Col>
            
            <Col className='mb-2'>
              <TextField
                disabled={isLoading || isFilterLoading}
                type='date'
                name='endAt'
                value={filters.endAt}
                onChange={e => handleChange(e, filters, setFilters)}
              />
            </Col>
          </Row>
        </Col>
        
        <Col md={2} />
        
        <Col className='mb-3' md={4}>
          <AwaitSingleSelectField
            disabled={isLoading || isFilterLoading}
            options={expensesOptions()}
            value={filters?.expenseType ?? null}
            onChange={e => setFilters(prev => ({ ...prev, expenseType: e}))}
            name='expenseType'
            placeholder='-- Par Type --'
            closeMenuOnSelect
          />
        </Col>
        
        <Col md={6}>
          <Row>
            <Col md={8} className='mb-2'>
              <TextField
                disabled={isLoading || isFilterLoading}
                name='object'
                value={filters.object}
                onChange={e => handleChange(e, filters, setFilters)}
                placeholder='-- Par Objet --'
              />
            </Col>
            
            <Col className='mb-2'>
              <TextField
                disabled={isLoading || isFilterLoading}
                name='expenseId'
                value={filters.expenseId}
                onChange={e => handleChange(e, filters, setFilters)}
                placeholder='-- Par N° | ID --'
              />
            </Col>
          </Row>
        </Col>
        
        <Col md={2} />
        
        <Col md={4} className='mb-2'>
          <Button type='submit' disabled={isLoading || isFilterLoading} className='w-100' variant='secondary'>
            {!(isLoading || isFilterLoading) && <i className='bi bi-search me-1'/>}
            {(isLoading || isFilterLoading) && <Spinner className='me-1' animation='grow' size='sm'/>}
            Rechercher
          </Button>
        </Col>
      </form>
      
      <div ref={contentRef}>
        {!isFiltered ?
          <DataTable
            stripedRows
            value={isPaginated ? paginatedItems : expenses}
            footer={footer}
            size='small'
          >
            <Column field='id' header='ID' />
            <Column body={expenseTitleBody} header='Objet' />
            <Column body={expenseDemandeur} header='Demandeur' />
            <Column body={expenseCategories} header='Types' />
            <Column body={expenseSubTotal} header='S/Total (USD)' />
            <Column body={expenseCreatedAt} header='Date' />
            <Column body={expensesActionsBody} header=' ' />
          </DataTable> :
          <DataTable
            paginator
            stripedRows
            removableSort
            value={filterItems}
            footer={footer}
            size='small'
            rows={25}
            paginatorLeft={(
              <>
                <Button size='sm' onClick={handleRefreshAll} disabled={isFetching} variant='outline-primary' className='me-1'>
                  {!isFetching && <i className='bi bi-arrow-clockwise'/>}
                  {isFetching && <Spinner animation='grow' size='sm'/>}
                </Button>
                
                {' / '}
                <b>{`${Math.ceil(filterItems.length / 25)} page(s) trouvée(s)`}</b>
              </>
            )}
          >
            <Column sortable field='id' header='ID' />
            <Column sortable field='objet' body={expenseTitleBody} header='Objet' />
            <Column body={expenseCategories} header='Types' />
            <Column body={expenseSubTotal} header='S/Total (USD)' />
            <Column sortable field='createdAt' body={expenseCreatedAt} header='Date' />
            <Column body={expensesActionsBody} header=' ' />
          </DataTable>}
      </div>
      
      {isLoading && <div className='mt-3'><RepeatableTableRows /></div>}
      
      {isError && (
        <div className='mt-3'>
          <Alert variant='danger' className='text-center' dismissible>
            {getErrorMessage(error)}
          </Alert>
        </div>
      )}
      
      {!isFiltered &&
        <PaginatorLayout2
          totalRecordsProp={totalExpensesPages * rows}
          firstProp={first}
          rowsProp={rows}
          pageProp={page}
          onFilteredQuery={getPaginateExpenses}
          totalPages={totalExpensesPages}
          setFirstPage={setFirst}
          setRowsPage={setRows}
          setPage={setPage}
          onRefresh={handleRefreshAll}
          filterParams='?page'
          isFetching={isFetching || isPaginateFetching || isFilterLoading}
          setIsPaginated={setIsPaginated}
        />}
      
      {isEdited && (
        <EditExpenseFormModal
          data={isEdited}
          show={!!isEdited}
          onHide={(): void => onExpenseCloseEditModal(setIsEdited)}
          onRefresh={isPaginated ? handleRefresh : handleRefreshAll}
        />
      )}
      
      {isDeleted && (
        <DeleteBonDeDepenseModal
          data={isDeleted}
          show={!!isDeleted}
          onHide={(): void => onExpenseCloseDeleteModal(setIsDeleted)}
          onRefresh={isPaginated ? handleRefresh : handleRefreshAll}
        />
      )}
      
      <PostNewExpenseModal
        show={show}
        onHide={onShow}
        onRefresh={isPaginated ? handleRefresh : handleRefreshAll}
      />
    </>
  )
  
}
