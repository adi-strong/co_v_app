import HeaderLastMenuItem from "./HeaderLastMenuItem.tsx";
import {onSideMenuToggle} from "../services/services.ts";
import {useState} from "react";

export default function Header() {
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <div className='header @@classList'>
      <div className='navbar-classic navbar navbar-expand-lg'>
        <span className='nav-toggle cursor-pointer' onClick={(): void => onSideMenuToggle(show, setShow)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-menu nav-icon me-2 icon-xs'
          >
            <line x1={3} y1={12} x2={21} y2={12} />
            <line x1={3} y1={6} x2={21} y2={6} />
            <line x1={3} y1={18} x2={21} y2={18} />
          </svg>
        </span>
        
        <div className='navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap'>
          <HeaderLastMenuItem />
        </div>
      </div>
    </div>
  )
  
}
