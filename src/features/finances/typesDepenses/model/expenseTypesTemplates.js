import {Link} from "react-router-dom";

export const expenseTypeNameBody = (service) => {
  return (
    <Link to={`#!`} className='text-uppercase'>
      <i className='bi bi-file-earmark-text me-1' />
      {service.nom}
    </Link>
  )
}

export const expenseTotalSubTypesBody = (service) => {
  const totalSousTypes = !isNaN(service.totalSousTypes) ? parseInt(service.totalSousTypes) : 0
  return totalSousTypes.toLocaleString()
}
