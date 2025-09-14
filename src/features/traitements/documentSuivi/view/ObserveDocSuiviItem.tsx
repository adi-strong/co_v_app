import type {ObserveationTreatmentByDate} from "../model/documentSuiviService.ts";
import moment from "moment";
import {Fragment} from "react";

export default function ObserveDocSuiviItem({ observe }: { observe: ObserveationTreatmentByDate }) {
  
  const { date, contents } = observe
  
  return (
    <>
      <tr>
        <td rowSpan={contents.length + 1} className='px-1 pe-1 text-dark border-1 border-black'>
          {moment(date).format('DD/MM/YY')}
        </td>
      </tr>
      
      {contents.length > 0 && contents.map((c, index) => (
        <tr key={index}>
          <td className='px-1 pe-1 text-dark border-1 border-black'>
            {c?.diagnostic}
          </td>
          
          <td className='px-1 pe-1 text-dark border-1 border-black'>
            {c.suiviTraitements.length > 0 && (
              <div>
                <ul>
                  {c.suiviTraitements.map((t, j) => (
                    <li key={j} className='text-capitalize fw-bold'>
                      {t.fkTraitement.nom} ;
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {c.observation}
          </td>
        </tr>
      ))}
    </>
  )
  
}
