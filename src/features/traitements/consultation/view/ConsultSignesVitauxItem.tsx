import type {SigneVitalHistoric} from "../model/consultationService.ts";
import moment from "moment";
import {formatNumberWithSpaces} from "../../../../services/services.ts";

export default function ConsultSignesVitauxItem({ sign }: { sign: SigneVitalHistoric }) {
  
  const { date, content} = sign
  
  return (
    <>
      <tr>
        <td rowSpan={content.length + 1} className='px-1 pe-1 border-1 border-black text-dark'>
          {moment(date).format('DD/MM/YY')}
        </td>
      </tr>
      
      {content.length > 0 && content.map((c, index) => (
        <tr key={index}>
          <td className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.temperature ? formatNumberWithSpaces(c.temperature) : '—'}
          </td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.poids ? formatNumberWithSpaces(c.poids) : '—'}
          </td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.tensionArterielle ? c.tensionArterielle : '—'}
          </td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.frequenceRespiratoire ? c.frequenceRespiratoire : '—'}
          </td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.frequenceCardiaque ? c.frequenceCardiaque : '—'}
          </td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.saturationEnOxygene ? c.saturationEnOxygene : '—'}
          </td>
          
          <td style={{ width: '20rem' }} className='px-1 pe-1 border-1 border-black text-dark text-center'>
            {c?.comment}
          </td>
        </tr>
      ))}
    </>
  )
  
}
