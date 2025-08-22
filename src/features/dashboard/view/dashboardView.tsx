import {memo} from 'react';
import {useDocumentTitle} from "../../../hooks";

const DashboardView = () => {
  
  useDocumentTitle('Tableau de bord')

  return (
    <div>
      <h1>Dashboard View</h1>
    </div>
  )
  
};

export default memo(DashboardView)
