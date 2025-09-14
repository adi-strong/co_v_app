import type {ExamenPrescrit} from "../../prescription/model/prescriptionService.ts";

export default function BonRezLabItem({ exam }: { exam: ExamenPrescrit }) {
  
  const { fkExam, resultats, valeurNormale } = exam
  const { nom } = fkExam
  
  return (
    <>
      <tr>
        <td className='px-1 pe-1 border-1 border-black text-dark text-center'>{nom.toUpperCase()}</td>
        <td className='px-1 pe-1 border-1 border-black text-dark text-center'>{resultats ? resultats : '—'}</td>
        <td className='px-1 pe-1 border-1 border-black text-dark text-center'>{valeurNormale ? valeurNormale : '—'}</td>
      </tr>
    </>
  )
  
}
