import type {User} from "../../user/model/userService.ts";
import {Card, Row} from "react-bootstrap";
import {ColDataContent} from "../../../components";
import {userRoleLabel} from "../../user/model/userService.ts";
import moment from "moment";

export default function UserOverviewTab({ data }: { data: User }) {
  
  return (
    <>
      <Card.Title as='h4' className='text-dark mt-3'>Aperçu</Card.Title> <hr/>
      <Row>
        <ColDataContent mb={5} md={6} title='N°' content={data.id} />
        <ColDataContent mb={5} md={6} title='Identifiant' content={data.username.toLowerCase()} />
        <ColDataContent mb={5} md={6} title='E-mail' content={data?.email?.toLowerCase() ?? '—'} />
        <ColDataContent mb={5} md={6} title='Nom complet' content={data?.fullName?.toUpperCase() ?? '—'} />
        <ColDataContent mb={5} md={6} title='Rôle' content={userRoleLabel[data.roles[0]]} />
        <ColDataContent mb={5} md={6} title='Enregistrer par' content={
          data?.fkUser && data.fkUser?.fullName
            ? data.fkUser.fullName
            : data?.fkUser ? data.fkUser.username.toLowerCase()
              : '—'
        } />
        <ColDataContent mb={5} md={6} title="Date d'enregistrement" content={
          data?.createdAt ? moment(data.createdAt).calendar() : '—'
        } />
        <ColDataContent mb={5} md={6} title='Dernière modification' content={
          data?.updatedAt ? moment(data.updatedAt).calendar() : '—'
        } />
      </Row>
    </>
  )
  
}
