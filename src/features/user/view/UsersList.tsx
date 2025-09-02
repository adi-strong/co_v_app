import {useState} from "react";
import UserData from "./UserData.tsx";
import {useGetUsersQuery} from "../model/user.api.slice.ts";
import type {User} from "../model/userService.ts";
import userSetUserItems from "../hooks/userSetUserItems.ts";

export default function UsersList() {
  
  const { data, isLoading, isFetching, refetch } = useGetUsersQuery('LIST')
  
  const [users, setUsers] = useState<User[]>([])
  
  userSetUserItems(data, setUsers)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <>
      <UserData
        users={users}
        setUsers={setUsers}
        loader={isLoading}
        onRefresh={onRefresh}
        isFetching={isFetching}
      />
    </>
  )
  
}
