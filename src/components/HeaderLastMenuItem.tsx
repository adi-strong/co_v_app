import {Dropdown} from "react-bootstrap";
import avatar from '../assets/images/avatar/avatar.jpg'
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {API} from "../features/app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import type {UserState} from "../features/auth/model/auth.slice.ts";
import {logout} from "../features/auth/model/auth.slice.ts";
import {onGoTo} from "../services/services.ts";
import {setResetInfos} from "../features/configs/infosGen/model/infosGen.slice.ts";
import {setResetCompte} from "../features/finances/compteCaisse/model/compteCaisse.slice.ts";

const HeaderLastMenuItem = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { user } = useSelector((state: UserState) => state.auth)

  return (
    <Dropdown as='li' className='ms-2 cursor-pointer'>
      <Dropdown.Toggle as='a' className='rounded-circle after-none'>
        <div className='avatar avatar-md avatar-indicators avatar-online'>
          <img alt='avatar' src={avatar} className='rounded-circle'/>
        </div>
      </Dropdown.Toggle>
      
      <Dropdown.Menu className='dropdown-menu-end'>
        <div className='px-4 pb-0 pt-2'>
          <div className='lh-1'>
            <h5 className='mb-1 text-capitalize'> {user && user.fullName}</h5>
            <Link to='/app/profil' className='text-inherit fs-6'>Voir mon profil</Link>
          </div>
          <Dropdown.Divider className='mt-3 mb-2' />
        </div>
        
        <ul className='list-unstyled'>
          <li>
            <Dropdown.Item as='a' className='cursor-pointer' onClick={(): void => onGoTo('/app/profil', navigate)}>
              <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='none'
                   stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'
                   className='feather feather-user me-2 icon-xxs dropdown-item-icon'>
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
                <circle cx={12} cy={7} r={4}/>
              </svg>
              <span className='ml-2'>Profil</span>
            </Dropdown.Item>
          </li>
          
          <li>
            <Dropdown.Item as='a' className='cursor-pointer'>
              <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='none'
                   stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'
                   className='feather feather-help-circle me-2 icon-xxs dropdown-item-icon'>
                <circle cx={12} cy={12} r={10}/>
                <path d="M9.09 9a3 3 0 1 1 5.83 1c0 1.5-2.25 2.25-2.25 2.25"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span className='ml-2'>Aide</span>
            </Dropdown.Item>
          </li>
          
          <li>
            <Dropdown.Item as='a' className='cursor-pointer' onClick={() => {
              toast.success('À bientôt !')
              dispatch(API.util?.resetApiState())
              dispatch(setResetInfos())
              dispatch(setResetCompte())
              dispatch(logout())
            }}>
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
                className='feather feather-power me-2 icon-xxs dropdown-item-icon'>
                <path d='M18.36 6.64a9 9 0 1 1-12.73 0'/>
                <line x1={12} y1={2} x2={12} y2={12}/>
              </svg>
              Déconnexion
            </Dropdown.Item>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  )
  
};

export default HeaderLastMenuItem;
