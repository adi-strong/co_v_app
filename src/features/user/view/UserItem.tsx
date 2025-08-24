import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import {handleShow, onMouseEnterEvent, onMouseLeaveEvent, setSelectedDataItem} from "../../../services/services.ts";
import {CheckField, RemoveModal} from "../../../components";
import {Link} from "react-router-dom";
import {Badge, Button} from "react-bootstrap";
import moment from "moment";
import type {User} from "../model/userService.ts";
import {getUserRole, userRoleColor, userRoleLabel} from "../model/userService.ts";

function onSubmit(data: any, onHide: () => void, onRefresh: () => void): void { onHide() }

export default function UserItem(props: {
  user: User
  setUsers: Dispatch<SetStateAction<User[]>>
  index: number
  isSelectedAll: boolean
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>
}) {
  
  const {
    user,
    index,
    setUsers,
  } = props
  
  const [isDel, setIsDel] = useState<boolean>(false)
  
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
          <Link to={`/app/users/${user.id}/${user?.slug}`}>
            {user.username.toLowerCase()}
          </Link>
          
          <div id={`actions-${index}`} hidden>
            <Link to={`/app/users/${user.id}/${user?.slug}/edit`} className='p-0 btn btn-sm btn-link'>
              Modifier
            </Link>{' | '}
            <Button variant='link' size='sm' className='p-0 text-danger' onClick={(): void => handleShow(setIsDel)}>
              Supprimer
            </Button>
          </div>
        </td>
        
        <td>{user?.fullName.toUpperCase()}</td>
        <td>
          <Badge bg={userRoleColor[getUserRole(user.roles)]}>{userRoleLabel[getUserRole(user.roles)]}</Badge>
        </td>
        <td>{user.tel}</td>
        <td>{user?.email?.toLowerCase() ?? '—'}</td>
        <td>{user?.createdAt ? moment(user.createdAt).format('DD/MM/YY') : '—'}</td>
      </tr>
      
      <RemoveModal
        isItIrreversible
        onSubmit={() => onSubmit(user, (): void => handleShow(setIsDel), (): void => { })}
        onHide={(): void => handleShow(setIsDel)}
        data={user}
        show={isDel}
        onRefresh={(): void => { }}
        title={<><br/> compte utilisateur : {user.username.toLowerCase()}</>}
      />
    </>
  )
  
}
