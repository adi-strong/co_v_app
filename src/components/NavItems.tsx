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
      
      <NavItem
        items={menuItems}
        index={1}
        pathname={pathname}
        onClick={toggleMenu}
        menuKey={menuItems[1].key}
      /> {/* Prescriptions */}
      
      <NavSubItem
        items={menuItems}
        index={2}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Accueil */}
      
      <li className='nav-item'>
        <div className='navbar-heading'>Opérations</div>
      </li>
      
      <NavSubItem
        items={menuItems}
        index={3}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Patients */}
      
      <NavItem
        items={menuItems}
        index={11}
        pathname={pathname}
        onClick={toggleMenu}
        menuKey={menuItems[11].key}
      /> {/* Structures */}
      
      <NavSubItem
        items={menuItems}
        index={4}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Traitements */}
      
      <NavSubItem
        items={menuItems}
        index={5}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Pharmacie */}
      
      <NavSubItem
        items={menuItems}
        index={6}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Personnel */}
      
      <NavSubItem
        items={menuItems}
        index={7}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Utilisateurs */}
      
      <NavSubItem
        items={menuItems}
        index={8}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Finances */}
      
      <NavSubItem
        items={menuItems}
        index={9}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Factures */}
      
      <li className='nav-item'>
        <div className='navbar-heading'>Configurations</div>
      </li>
      
      <NavSubItem
        items={menuItems}
        index={10}
        pathname={pathname}
        onClick={toggleSubMenu}
      /> {/* Réglages */}
    </>
  )
  
};

export default NavItems;
