import logo from '../assets/images/logo-md.png';
import {Image} from "react-bootstrap";

export default function LogoLoader() {
  
  return (
    <div className='text-center pt-3 pb-3'>
      <Image fluid rounded roundedCircle src={(logo) as string} className='loader-image' alt=''/>
    </div>
  )
  
}
