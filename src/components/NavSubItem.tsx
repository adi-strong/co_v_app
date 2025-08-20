import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import {Fragment} from "react";
import type {AppMenuItemInt} from "../interfaces/AppMenuItemInt.ts";

type Item = {
  index?: number
  items: AppMenuItemInt[]
  menuKey?: string | number
  onClick: (menuKey: string | number) => void
  pathname?: string
}

export default function NavSubItem(
  {
    items,
    index = 0,
    onClick,
    pathname,
  }: Item) {
  
  const item = items[index];
  
  return (
    <li className='nav-item'>
      <Link
        to={item.to}
        data-bs-toggle='collapse'
        className={`nav-link has-arrow ${item.isOpen ? 'active' : ''}`}
        onClick={() => onClick(index)}
      >
        <i className={`nav-icon icon-xs me-2 ${item.icon}`}/>
        {item.label}
      </Link>
      
      <Collapse in={item?.isOpen} children={
        <ul className='nav flex-column'>
          {item?.subItems && Array.isArray(item.subItems) && item.subItems.length > 0 && (
            <>
              {item.subItems.map((s, j) =>
                <li key={j} className='nav-item'>
                  <Link to={s.to} className={`nav-link ${pathname === s.to && 'active'}`}>
                    {s.label}
                  </Link>
                </li>)}
            </>
          )}
        </ul>
      }/>
    </li>
  );
  
}
