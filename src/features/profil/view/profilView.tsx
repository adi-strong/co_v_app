import {memo} from 'react';
import {useDocumentTitle} from "../../../hooks";

const ProfilView = () => {
  
  useDocumentTitle('Mon profil')

  return (
    <div>
      <h1>Profil View</h1>
    </div>
  )
  
};

export default memo(ProfilView)
