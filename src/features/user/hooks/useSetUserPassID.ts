import type {PassType, User} from "../model/userService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";

export default function useSetUserPassID(user?: User, setState?: Dispatch<SetStateAction<PassType>>): void {
  
  useEffect(() => {
    if (user && setState) {
      setState(prev => ({
        ...prev,
        userId: user.id,
      }))
    }
  }, [user, setState]);
  
}
