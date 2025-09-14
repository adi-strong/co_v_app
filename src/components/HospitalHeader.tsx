import {useSelector} from "react-redux";
import type {InfoGenState} from "../features/configs/infosGen/model/infosGen.slice.ts";
import {Image} from "react-bootstrap";
import {APP_ENTRYPOINT} from "../config/configs.ts";
import {getMediumMediaImage} from "../services/services.ts";
import avatar from "../assets/images/placeholder/placeholder-4by3.svg";

const HospitalHeader = () => {
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)

  return infos && (
    <>
      <div className='text-center'>
        <h4>RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</h4>
        <h5 className='text-danger'>MINISTÈRE DE LA SANTÉ</h5>
        <h3 className='text-danger text-uppercase fw-bold'>{infos.nom}</h3>
        
        {infos?.logo &&
          <Image
            roundedCircle
            width={100}
            height={100}
            src={(`${APP_ENTRYPOINT+getMediumMediaImage(infos.logo.contentUrl)}`) as string}
            alt='logo'
          />}
        
        {infos?.address && <div style={{ fontSize: '0.8rem' }}>{infos.address}</div>}
        
        <hr className='text-dark' />
      </div>
    </>
  )
  
};

export default HospitalHeader;
