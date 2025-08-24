import {Link, Outlet} from "react-router-dom";
import {Header, QuixNav} from "../components";
import logo from '../assets/images/logo-md.png'
import {Image} from "react-bootstrap";

export default function PrivateLayout() {
  
  return (
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
  )
  
}
