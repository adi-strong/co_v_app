import HeaderLastMenuItem from "./HeaderLastMenuItem.tsx";

const HeaderItems = () => {

  return (
    <>
      <ul className='navbar-nav header-right'>
        <li className='nav-item dropdown notification_dropdown' />
        
        <HeaderLastMenuItem/>
      </ul>
    </>
  )
  
};

export default HeaderItems;
