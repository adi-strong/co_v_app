import HeaderLastMenuItem from "./HeaderLastMenuItem.tsx";
import {onSideMenuToggle} from "../services/services.ts";
import {useState} from "react";

export default function Header() {
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <div className='header @@classList'>
      <div className='navbar-classic navbar navbar-expand-lg'>
        <span className='nav-toggle cursor-pointer' onClick={(): void => onSideMenuToggle(show, setShow)}>
          <i className='bi bi-list cursor-pointer' />
        </span>
        
        <ul className='navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap'>
          <HeaderLastMenuItem/>
        </ul>
      </div>
    </div>
  )
  
}
