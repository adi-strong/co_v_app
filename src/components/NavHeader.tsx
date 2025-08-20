import {Link} from "react-router-dom";
import logo from '../assets/images/logo.png'

export default function NavHeader() {
  
  return (
    <div className='nav-header'>
      <Link to='/' className='brand-logo'>
        <img className='logo-abbr' src={logo} alt=''/>
      </Link>
      
      <div className='nav-control'>
        <div className='hamburger'>
          <span className='line'/>
          <span className='line'/>
          <span className='line'/>
        </div>
      </div>
    </div>
  )
  
}
