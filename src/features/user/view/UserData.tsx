import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {Button, Card, Col, Row, Spinner, Table} from "react-bootstrap";
import {selectAllStateItems, tableWhiteStyle} from "../../../services/services.ts";
import {CheckField, TextField} from "../../../components";
import {handleChange} from "../../../services/form.hander.service.ts";
import type {User} from "../model/userService.ts";
import {Link} from "react-router-dom";
import {getUserHeadItems} from "../model/userService.ts";
import UserItem from "./UserItem.tsx";
import {RepeatableTableRows} from "../../../loaders";

export default function UserData(props: {
  users: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
  loader: boolean
  onRefresh: () => void
  isFetching: boolean
}) {
  
  const { users, setUsers, loader, isFetching, onRefresh } = props
  
  const [search, setSearch] = useState<{ keyword: string }>({ keyword: '' })
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  
  return (
    <>
      <Row>
        <Col md={6}>
          <Card.Title as='h5' className='mx-4 mt-5 me-4'>
            <Button
              disabled={loader || isFetching}
              variant='link'
              size='sm'
              className='me-2'
              title='Actualiser'
              onClick={onRefresh}>
              {!isFetching && (<i className='bi bi-arrow-clockwise'/>) as ReactNode}
              {isFetching && (<Spinner animation='grow' size='sm' />) as ReactNode}
            </Button>
            Liste des comptes utilisateurs
            
            <Link to='/app/users/new' className='mx-5 btn btn-sm btn-link' title='Nouveau fournisseur'>
              <i className='bi bi-plus'/> Nouveau compte
            </Link>
          </Card.Title>
        </Col>
        
        <Col md={6} className='pt-4 pt-5 px-4 text-md-end'>
          <form className='row' onSubmit={e => e.preventDefault()}>
            <Col md={7} className='mb-1'>
              <TextField
                disabled={loader}
                size='sm'
                name='keyword'
                value={search.keyword}
                onChange={e => handleChange(e, search, setSearch)}
              />
            </Col>
            
            <Col md={5} className='mb-1'>
              <Button type='submit' disabled={loader} variant='outline-primary' className='w-100' size='sm'>
                Rechercher des utilisateurs
              </Button>
            </Col>
          </form>
        </Col>
      </Row>
      
      <Row className='px-6 pe-4 pb-4'>
        <Col md={6} className='mb-1'>
          <Button disabled={false} variant='outline-warning' size='sm' className='me-1'>
            <i className='bi bi-file-earmark-pdf me-1'/>
            Imprimer en pdf
          </Button>
        </Col>
        
        <Col md={6} className='mb-1 text-md-end'>
          <Button disabled={false} variant='outline-success' size='sm'>
            <i className='bi bi-file-earmark-excel me-1'/>
            Exporter en excel
          </Button>
        </Col>
      </Row>
      
      <Table hover responsive>
        <thead className='table-light'>
        <tr>
          <th style={{ fontSize: '1rem' }}>
            <CheckField
              inline
              disabled={false}
              name='isSelectedAll'
              value={isSelectedAll}
              checked={isSelectedAll}
              onChange={(): void => selectAllStateItems(isSelectedAll, setIsSelectedAll, setUsers)}
              className='me-0'
            />
            Username
          </th>
          
          {getUserHeadItems().length > 0 && getUserHeadItems().map(t =>
            <th key={t.th} style={{ fontSize: '1rem' }}>{t.th}</th>)}
        </tr>
        </thead>
        
        <tbody style={tableWhiteStyle.tbody}>
        {users.length > 0 && users.map((c, index: number) =>
          <UserItem
            key={index}
            user={c}
            setUsers={setUsers}
            index={index}
            isSelectedAll={isSelectedAll}
            setIsSelectedAll={setIsSelectedAll}
          />)}
        </tbody>
      </Table>
      
      {loader && <RepeatableTableRows/>}
    </>
  )
  
}
