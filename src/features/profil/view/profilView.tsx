import {memo, ReactNode, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../hooks";
import {BodyContainer, PageTitles, ProfileHeaderComponent} from "../../../components";
import {getProfileTabItems, getUserFakeData, userRoleLabel} from "../../user/model/userService.ts";
import {Link} from "react-router-dom";
import UserOverviewTab from "./UserOverviewTab.tsx";
import ChangePasswordTab from "./ChangePasswordTab.tsx";
import {Card} from "react-bootstrap";

const ProfilView = () => {
  
  useDocumentTitle('Mon profil')
  useActivePage('accounts')
  
  const [key, setKey] = useState<string>('overview')

  return (
    <BodyContainer>
      <PageTitles title='Mon profil'/>
      
      <ProfileHeaderComponent
        name={getUserFakeData()[0].username}
        role={userRoleLabel[getUserFakeData()[0].roles[0]]}
        tabItems={getProfileTabItems()}
        keyTab={key}
        setTabKey={setKey}
        actionsChildren={(
          <>
            <Link
              to={`/app/users/1/admin/edit`}
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
            {key === 'overview' && <UserOverviewTab data={getUserFakeData()[0]}/> as ReactNode}
            {key === 'edit_password' && <ChangePasswordTab data={getUserFakeData()[0]}/> as ReactNode}
          </Card.Body>
        </Card>
      </div>
    </BodyContainer>
  )
  
};

export default memo(ProfilView)
