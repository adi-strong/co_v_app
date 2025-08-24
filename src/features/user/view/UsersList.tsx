import {useState} from "react";
import {getUserFakeData} from "../model/userService.ts";
import UserData from "./UserData.tsx";

export default function UsersList() {
  
  const [users, setUsers] = useState(getUserFakeData())
  
  return (
    <>
      <UserData
        users={users}
        setUsers={setUsers}
      />
    </>
  )
  
}

