import type {Dispatch, ReactNode, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../services/services.ts";
import {CheckField, SideContent} from "../../../components";
import {Link} from "react-router-dom";
import {Badge, Button} from "react-bootstrap";
import moment from "moment";
import type {User} from "../model/userService.ts";
import {getUserRole, userRoleColor, userRoleLabel} from "../model/userService.ts";
import EditUserPasswordForm from "./EditUserPasswordForm.tsx";
import RemoveUserModal from "./RemoveUserModal.tsx";

export default function UserItem(props: {
  user: User
  setUsers: Dispatch<SetStateAction<User[]>>
  index: number
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
  onRefresh: () => void
}) {
  
  const {
    user,
    index,
    setUsers,
    onRefresh
  } = props
  
  const [isDel, setIsDel] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <>
      <tr>
        <td
          id={`item-${index}`}
          onMouseEnter={(): void => onMouseEnterEvent(index)}
          onMouseLeave={(): void => onMouseLeaveEvent(index)}
        >
          <CheckField
            inline
            name='selected'
            value={user.selected}
            checked={user.selected}
            onChange={(): void => setSelectedDataItem(index, setUsers)}
            className='me-0'
          />
          <Link to={`/app/users/${user.id}/${user?.slug}/edit`}>
            {user.username.toLowerCase()}
          </Link>
          
          {(getUserRole(user.roles) !== 'ROLE_SUPER_ADMIN') && (
            <div id={`actions-${index}`} hidden>
              <Button variant='link' size='sm' className='p-0' onClick={(): void => handleShow(setShow)}>
                Mot de passe
              </Button>
              {' | '}
              <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
                Supprimer
              </Button>
            </div>
          )}
        </td>
        
        <td>{user?.fullName.toUpperCase()}</td>
        <td>
          <Badge bg={userRoleColor[getUserRole(user.roles)]}>{userRoleLabel[getUserRole(user.roles)]}</Badge>
        </td>
        <td>{user.tel}</td>
        <td>{user?.createdAt ? moment(user.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveUserModal
        onHide={(): void => handleShow(setIsDel)}
        data={user}
        show={isDel}
        onRefresh={onRefresh}
      />
      
      <SideContent
        show={show}
        onHide={(): void => handleShow(setShow)}
        title='Modifier le mot de passe'
        icon='pencil-square'
        children={(<EditUserPasswordForm data={user} onHide={(): void => handleShow(setShow)}/>) as ReactNode}
      />
    </>
  )
  
}
