import type {SigneVitalHistoric} from "../../consultation/model/consultationService.ts";
import ConsultSignesVitauxItem from "../../consultation/view/ConsultSignesVitauxItem.tsx";

export default function SignesVitauxTable({ signes }: { signes: SigneVitalHistoric[] }) {
  
  return (
    <div className='mt-5' style={{fontSize: '0.8rem'}}>
      <table className='w-100'>
        <thead>
        <tr>
          <th rowSpan={2} className='text-dark border-1 border-black pt-1 pb-1 px-1 pe-1'>Date</th>
          <th colSpan={7} className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>
            Signes Vitaux
          </th>
        </tr>
        
        <tr>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>T° C</th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>Poids</th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>T.A</th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>F.R</th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>F.C</th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>
            SpO<span style={{fontSize: '0.5rem'}}>2</span>
          </th>
          <th className='text-dark text-center border-1 border-black pt-1 pb-1 px-1 pe-1'>Commentaire(s)</th>
        </tr>
        </thead>
        
        <tbody>
        {signes.length > 0 && signes.map((s, index) => (
          <ConsultSignesVitauxItem key={index} sign={s}/>
        ))}
        </tbody>
      </table>
    </div>
  )
  
}
