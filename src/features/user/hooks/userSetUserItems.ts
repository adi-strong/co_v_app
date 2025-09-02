import type {User} from "../model/userService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function userSetUserItems(data: User[], setUsers: Dispatch<SetStateAction<User[]>>): void {
  
  useEffect(() => {
    if (data && data.length > 0) {
      setUsers(data)
    }
  }, [data, setUsers]);
  
}
