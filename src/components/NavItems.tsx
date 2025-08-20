import type {MenuItemsState} from "../reducers/menu.ts";
import {useDispatch, useSelector} from "react-redux";
import {onOpenSubMenu, onToggleMenu} from "../reducers/menu.ts";
import {useLocation} from "react-router-dom";
import NavItem from "./NavItem.tsx";
import NavSubItem from "./NavSubItem.tsx";

const NavItems = () => {
  
  const { menuItems } = useSelector((state: MenuItemsState) => state.menu)
  
  const { pathname } = useLocation()
  
  const dispatch = useDispatch()
  
  const toggleMenu = (menuKey: number | string) => dispatch(onToggleMenu({ menuKey }))
  
  const toggleSubMenu = (index: number | string) => dispatch(onOpenSubMenu( index ))

  return (
    <>
      <NavItem
        items={menuItems}
        index={0}
        pathname={pathname}
        onClick={toggleMenu}
        menuKey={menuItems[0].key}
      /> {/* Dashboard */}
      
      <li className='nav-item'>
        <div className='navbar-heading'>Opérations</div>
      </li>
      
      <NavSubItem
        items={menuItems}
        index={1}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Articles */}
      
      <NavItem
        items={menuItems}
        index={2}
        pathname={pathname}
        onClick={toggleMenu}
        menuKey={menuItems[2].key}
      /> {/* Comments */}
      
      <NavSubItem
        items={menuItems}
        index={3}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Accounts */}
      
      <NavItem
        items={menuItems}
        index={4}
        pathname={pathname}
        onClick={toggleMenu}
        menuKey={menuItems[4].key}
      /> {/* Contacts */}
      
      <NavSubItem
        items={menuItems}
        index={5}
        pathname={pathname}
        onClick={toggleSubMenu}
      />{/* Team */}
      
      <NavItem
        items={menuItems}
        index={7}
        pathname={pathname}
        onClick={toggleMenu}
        menuKey={menuItems[7].key}
      /> {/* Rendezvous */}
      
      <li className='nav-item'>
        <div className='navbar-heading'>Paramètres</div>
      </li>
      
      <NavSubItem
        items={menuItems}
        index={6}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Projects */}
      
      <NavSubItem
        items={menuItems}
        index={8}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Params */}
    </>
  )
  
};

export default NavItems;
