import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {Header, QuixNav} from "../components";
import logo from '../assets/images/logo-md.png'
import {Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import type {UserState} from "../features/auth/model/auth.slice.ts";
import useSetInfos from "./hooks/useSetInfos.ts";
import useSetUserSession from "./hooks/useSetUserSession.ts";
import useSetCaisse from "./hooks/useSetCaisse.ts";

export default function PrivateLayout() {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/app/profil'
  
  const { token } = useSelector((state: UserState) => state.auth)
  
  useSetUserSession(dispatch)
  useSetCaisse(dispatch)
  useSetInfos(dispatch)
  
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
