import {
  ExpenseType, expenseTypesCloseDeleteModal,
  expenseTypesCloseEditModal,
  expenseTypesOpenDeleteModal,
  expenseTypesOpenEditModal
} from "../model/typesDepensesService";
import {totalExpenseTypesItems} from "../model/typesDepenses.api.slice";
import {useState} from "react";
import {Button, Dropdown, Spinner} from "react-bootstrap";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {expenseTotalSubTypesBody, expenseTypeNameBody} from "../model/expenseTypesTemplates";
import {SideContent} from "../../../components";
import TypesDepensesForm from "./TypesDepensesForm";
import DeleteExpenseTypeModal from "./DeleteExpenseTypeModal";

export default function TypesDepensesList({ types, onRefresh, filters, isFetching }: {
  types: ExpenseType[],
  isFetching: boolean,
  onRefresh: () => void,
  filters: any
}) {
  
  const footer = `Il y a au total ${totalExpenseTypesItems} lignes trouvés.`;
  
  const [isEdited, setIsEdited] = useState<ExpenseType | null>(null);
  const [isDeleted, setIsDeleted] = useState<ExpenseType | null>(null);
  
  const expenseTypesActionsBody = (expense: ExpenseType) => {
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
                  onClick={() => { }}>
                  <i className='bi bi-eye'/> Voir
                </Dropdown.Item>
                
                <Dropdown.Item
                  className='cursor-pointer text-primary'
                  onClick={(): void => expenseTypesOpenEditModal(expense, setIsEdited)}>
                  <i className='bi bi-pencil-square'/> Modifier
                </Dropdown.Item>
                
                <Dropdown.Item
                  className='cursor-pointer text-danger'
                  onClick={(): void => expenseTypesOpenDeleteModal(expense, setIsDeleted)}>
                  <i className='bi bi-trash'/> Supprimer
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        />
      </div>
    )
  }
  
  return (
    <>
      <DataTable
        paginator
        stripedRows
        value={types}
        footer={footer}
        size='small'
        rows={25}
        filters={filters}
        paginatorLeft={(
          <>
            <Button size='sm' onClick={onRefresh} disabled={isFetching} variant='outline-primary' className='me-1'>
              {!isFetching && <i className='bi bi-arrow-clockwise'/>}
              {isFetching && <Spinner animation='grow' size='sm'/>}
            </Button>
            
            {' / '}
            <b>{`${Math.ceil(types.length / 25)} page(s) trouvée(s)`}</b>
          </>
        )}
      >
        <Column field='id' header='ID' />
        <Column field='nom' body={expenseTypeNameBody} header='Désignation' />
        <Column field='totalAgents' body={expenseTotalSubTypesBody} header='Total Sous Types' />
        <Column body={expenseTypesActionsBody} header=' ' />
      </DataTable>
      
      {isEdited && (
        <SideContent
          title='Modification du type de dépenses'
          onHide={(): void => expenseTypesCloseEditModal(setIsEdited)}
          show={!!isEdited}
          placement='end'
          icon='plus'
          children={
            <TypesDepensesForm
              onHide={(): void => expenseTypesCloseEditModal(setIsEdited)}
              onRefresh={onRefresh}
              data={isEdited}
            />
          }
        />
      )}
      
      {isDeleted && (
        <DeleteExpenseTypeModal
          data={isDeleted}
          show={!!isDeleted}
          onHide={(): void => expenseTypesCloseDeleteModal(setIsDeleted)}
          onRefresh={onRefresh}
        />
      )}
    </>
  )
  
}
