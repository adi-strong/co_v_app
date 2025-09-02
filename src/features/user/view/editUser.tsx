import {memo} from "react";
import {BodyContainer, PageTitles} from "../../../components";
import {useActivePage, useDocumentTitle} from "../../../hooks";
import UserForm from "./UserForm.tsx";
import {useGetUniqueUserQuery} from "../model/user.api.slice.ts";
import {useParams} from "react-router-dom";

const EditUser = () => {
  
  useDocumentTitle('Compte utilisateur')
  useActivePage('accounts')
  
  const { id } = useParams()
  const { data, isFetching, refetch } = useGetUniqueUserQuery(id)
  
  const onRefresh = async (): Promise<void> => {
    await refetch()
  }
  
  return (
    <BodyContainer>
      <PageTitles title='Compte utilisateur'/>
      <UserForm data={data} loader={isFetching} onRefresh={onRefresh} />
    </BodyContainer>
  )
  
}

export default memo(EditUser)
