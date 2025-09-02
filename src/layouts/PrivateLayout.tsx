import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {Header, QuixNav} from "../components";
import logo from '../assets/images/logo-md.png'
import {Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import type {UserState} from "../features/auth/model/auth.slice.ts";
import {useLazyGetUniqueUserQuery} from "../features/user/model/user.api.slice.ts";
import {RefObject, useEffect, useRef} from "react";
import {setUser} from "../features/auth/model/auth.slice.ts";
import {useLazyGetUniqueInfosQuery} from "../features/configs/infosGen/model/infosGen.api.slice.ts";
import type {InfoGenState} from "../features/configs/infosGen/model/infosGen.slice.ts";
import type {InfosGen} from "../features/configs/infosGen/model/infosGenService.ts";
import {setInfosGen} from "../features/configs/infosGen/model/infosGen.slice.ts";

export default function PrivateLayout() {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/app/profil'
  
  const { token, user } = useSelector((state: UserState) => state.auth)
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  
  const [getUniqueUser] = useLazyGetUniqueUserQuery()
  const [getUniqueInfos] = useLazyGetUniqueInfosQuery()
  
  const hasFetchedUser: RefObject<boolean> = useRef(false)
  
  const hasFetchedInfos: RefObject<boolean> = useRef(false)
  
  useEffect((): void => {
    const fetchInfos = async (): Promise<void> => {
      if (!(hasFetchedInfos.current && infos)) {
        hasFetchedInfos.current = true
        
        try {
          const infoSession: InfosGen = await getUniqueInfos(1).unwrap()
          dispatch(setInfosGen({ infos: {
              id: infoSession.id,
              nom: infoSession.nom,
              slogan: infoSession?.slogan ?? undefined,
              logo: infoSession?.logo ?? undefined,
              about: infoSession?.about ?? undefined,
              address: infoSession?.address ?? undefined,
              tel: infoSession.tel,
              email: infoSession?.email ?? undefined,
              tel2: infoSession?.tel2 ?? undefined,
              email2: infoSession?.email2 ?? undefined,
              selected: infoSession.selected,
            }}))
        } catch (error) { }
      }
    }
    
    fetchInfos()
  }, [getUniqueInfos, dispatch, infos])
  
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
  
  return token || localStorage.getItem('authToken') ?  (
    <div id='db-wrapper'>
      <nav className='navbar-vertical navbar'>
        <div className='slimScrollDiv'>
          <div className='nav-scroller'>
            <Link className='navbar-brand text-light fw-bold' to='/app/dashboard'>
              <Image
                roundedCircle
                className='me-1'
                src={logo}
                alt=''
              />
              C.O
            </Link>
            
            <QuixNav />
          </div>
        </div>
      </nav>
      
      <div id='page-content'>
        <Header/>
        <Outlet />
      </div>
    </div>
  ) : <Navigate to='/' state={{ from }} />
  
}
