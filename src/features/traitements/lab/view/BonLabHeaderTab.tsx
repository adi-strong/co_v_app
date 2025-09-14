import {formatNumberWithSpaces, sexLabel} from "../../../../services/services.ts";
import type {Lab} from "../model/labService.ts";

const dottedBorder = { borderBottom: '1px dotted #000' }

export default function BonLabHeaderTab({ lab }: { lab: Lab }) {
  
  const { fkConsultation, fkPatient } = lab
  const { fullName, nom, age, sexe} = fkPatient
  const { fkAgent, renseignementClinic } = fkConsultation
  
  return (
    <>
      <table className='mt-5 w-100'>
        <thead>
        <tr>
          <th className='pe-1 px-1 text-dark'>Demandé par</th>
          <td className='pe-1 px-1 text-dark' style={dottedBorder}>
            : Dr. {fkAgent?.fullName?.toUpperCase() ?? fkAgent.nom.toUpperCase()}
          </td>
          
          <th className='pe-1 px-1 text-dark'>N° Tél.</th>
          <td colSpan={3} className='pe-1 px-1 text-dark' style={dottedBorder}>: {fkAgent.tel}</td>
        </tr>
        
        <tr>
          <th style={{width: '12rem'}} className='pe-1 pt-4 px-1 text-dark'>Nom du(de la) patient(e)</th>
          <td className='pe-1 pt-4 px-1 text-dark' style={dottedBorder}>
            : {fullName?.toUpperCase() ?? nom.toUpperCase()}
          </td>
          
          <th className='pe-1 pt-4 px-1 text-dark'>Âge</th>
          <td className='pe-1 pt-4 px-1 text-dark' style={dottedBorder}>
            : {age ? `${formatNumberWithSpaces(age)} an(s)` : ''}
          </td>
          
          <th className='pe-1 pt-4 px-1 text-dark'>Sexe</th>
          <td className='pe-1 pt-4 px-1 text-dark' style={dottedBorder}>
            : {sexe ? sexLabel[sexe] : ''}
          </td>
        </tr>
        
        <tr>
          <th style={{width: '12rem'}} className='pe-1 pt-4 px-1 text-dark'>Nature de l'échantillon</th>
          <td colSpan={5} className='pe-1 pt-4 px-1 text-dark' style={dottedBorder}>: {lab?.nature}</td>
        </tr>
        </thead>
      </table>
      
      <p className='mt-5 px-1 pe-1'>
        <b className='text-dark'>Renseignements cliniques : </b> <br/>
        {renseignementClinic && <span className='white-space'>{renseignementClinic}</span>}
      </p>
    </>
  )
  
}
