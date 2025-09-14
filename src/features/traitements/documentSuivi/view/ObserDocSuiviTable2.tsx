import type {DocumentSuivi} from "../model/documentSuiviService.ts";
import {getTreatmentsObserveByDates} from "../model/documentSuiviService.ts";
import ObserveDocSuiviItem from "./ObserveDocSuiviItem.tsx";

export default function ObserDocSuiviTable2({ doc }: { doc: DocumentSuivi }) {
  
  const { observationTraitements } = doc
  
  const observations = getTreatmentsObserveByDates(observationTraitements)
  
  return (
    <div className='mt-5' style={{fontSize: '0.8rem'}}>
      <table className='w-100'>
        <thead>
        <tr>
          <th style={{ width: '5rem' }} className='text-dark border-1 border-black pt-1 pb-1 px-1 pe-1 bg-light'>Date</th>
          <th style={{ width: '20rem' }} className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1 bg-light'>
            Plaintes & Diagnostics
          </th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1 bg-light'>
            C.A.T & Traitements
          </th>
        </tr>
        </thead>
        
        <tbody>
        {observations.length > 0 && observations.map((o, index) => (
          <ObserveDocSuiviItem key={index} observe={o} />
        ))}
        </tbody>
      </table>
    </div>
  )
  
}
