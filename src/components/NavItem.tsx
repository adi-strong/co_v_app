import { Link } from "react-router-dom";
import type {AppMenuItemInt} from "../interfaces/AppMenuItemInt.ts";

type Item = {
  index?: number;
  items: AppMenuItemInt[];
  menuKey?: string | number;
  onClick: (menuKey: string | number) => void;
  pathname?: string;
}

export default function NavItem(
  {
    items,
    index = 0,
    onClick,
    menuKey,
    pathname,
  }: Item) {
  const item = items[index];
  
  return (
    <li className='nav-item'>
      <Link
        to={item.to}
        className={`nav-link has-arrow ${item.to === pathname ? 'active' : ''}`}
        onClick={() => onClick(menuKey || index)}
      >
        <i className={`me-2 ${item.icon}`}/>
        {item.label}
      </Link>
    </li>
  );
}
