import {memo, ReactNode, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles, ProfileHeaderComponent} from "../../../components";
import {Link} from "react-router-dom";
import UserOverviewTab from "./UserOverviewTab.tsx";
import ChangePasswordTab from "./ChangePasswordTab.tsx";
import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import type {UserState} from "../../auth/model/auth.slice.ts";
import type {User} from "../../user/model/userService.ts";
import {getProfileTabItems, userRoleLabel} from "../../user/model/userService.ts";

const ProfilView = () => {
  
  useDocumentTitle('Mon profil')
  useActivePage('accounts')
  
  const [key, setKey] = useState<string>('overview')
  
  const { user } = useSelector((state: UserState) => state.auth)

  return (
    <BodyContainer>
      <PageTitles title='Mon profil'/>
      
      <ProfileHeaderComponent
        name={(user ? user.fullName : '—') as string}
        role={(user ? userRoleLabel[user.roles[0]] : '—')}
        tabItems={getProfileTabItems()}
        keyTab={key}
        setTabKey={setKey}
        actionsChildren={(
          <>
            <Link
              to={`/app/users/${user?.id}/admin/edit`}
              className='me-1 btn btn-outline-primary d-none d-md-block'
            >
              Modifier le profil
            </Link>
          </>
        ) as ReactNode}
      />
      
      <div className='py-6'>
        <Card>
          <Card.Body>
            {user && key === 'overview' && <UserOverviewTab data={(user) as User}/> as ReactNode}
            {user && key === 'edit_password' && <ChangePasswordTab data={(user) as User}/> as ReactNode}
          </Card.Body>
        </Card>
      </div>
    </BodyContainer>
  )
  
};

export default memo(ProfilView)
