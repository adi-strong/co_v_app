import {useLazyGetUniqueUserQuery} from "../../features/user/model/user.api.slice.ts";
import {RefObject, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import type {UserState} from "../../features/auth/model/auth.slice.ts";
import {setUser} from "../../features/auth/model/auth.slice.ts";

export default function useSetUserSession(dispatch: (params?: any) => void): void {
  
  const { token, user } = useSelector((state: UserState) => state.auth)
  
  const [getUniqueUser] = useLazyGetUniqueUserQuery()
  
  const hasFetchedUser: RefObject<boolean> = useRef(false)
  
  useEffect((): void => {
    const fetchUser = async (): Promise<void> => {
      if (!hasFetchedUser.current && user && token) {
        hasFetchedUser.current = true;
        
        try {
          const session = await getUniqueUser(user.id).unwrap();
          dispatch(setUser({
            user: {
              id: session.id,
              username: session.username,
              fullName: session.fullName,
              roles: session.roles ?? [],
              fkAgent: session?.fkAgent ?? undefined,
              fkService: session?.fkAgent?.fkService ?? undefined,
              // fkGrade: session?.fkAgent?.fkGrade ?? undefined,
              fkFonction: session?.fkAgent?.fkFonction ?? undefined,
              active: !!session.active,
              tel: session.tel,
              email: session?.email,
              createdAt: session?.createdAt,
            },
            token
          }));
        } catch (error) { }
      }
    };
    
    fetchUser();
  }, [dispatch, getUniqueUser, token, user])
  
}
