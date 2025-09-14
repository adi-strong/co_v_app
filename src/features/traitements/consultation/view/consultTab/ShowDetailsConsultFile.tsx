import type {Consultation, SigneVital} from "../../model/consultationService.ts";
import {HospFooter, HospitalHeader} from "../../../../../components";
import {etatCivilLabel, formatNumberWithSpaces} from "../../../../../services/services.ts";
import {getSignesByDates} from "../../../documentSuivi/model/documentSuiviService.ts";
import ObserDocSuiviTable from "../../../documentSuivi/view/ObserDocSuiviTable.tsx";
import SignesVitauxTable from "../../../documentSuivi/view/SignesVitauxTable.tsx";

const dottedBorder = { borderBottom: '1px dotted #000' }

export default function ShowDetailsConsultFile({ consult }: { consult: Consultation }) {
  
  const {
    fkPatient,
    documentSuivi,
    fkAgent,
  } = consult
  
  const signesVitaux: SigneVital[] = documentSuivi && documentSuivi.signesVitaux.length > 0
    ? documentSuivi.signesVitaux
    : []
  
  const signes = getSignesByDates(signesVitaux)
  
  return (
    <>
      <HospitalHeader/>
      
      <div style={{ fontSize: '0.8rem' }}>
        <table className='w-100'>
          <thead>
          <tr>
            <th style={{ width: '10rem' }} className='text-dark pt-2'>Nom du(de la) patient(e)</th>
            <th colSpan={5} className='text-uppercase pt-2' style={dottedBorder}>: {fkPatient?.fullName ?? fkPatient.nom}</th>
          </tr>
          
          <tr>
            <th className='text-dark pt-3'>Adresse</th>
            <th colSpan={5} className='text-capitalize pt-3' style={dottedBorder}>: {fkPatient?.adresse}</th>
          </tr>
          
          <tr>
            <th className='text-dark pt-3'>N° Tél.</th>
            <th className='text-uppercase pt-3' style={dottedBorder}>: {fkPatient?.tel}</th>
            
            <th style={{ width: '4rem' }} className='text-dark pt-2'>État-civil</th>
            <th className='text-uppercase pt-3' style={dottedBorder}>
              : {fkPatient?.etatCivil && etatCivilLabel[fkPatient.etatCivil]}
            </th>
            
            <th style={{ width: '2rem' }} className='text-dark pt-3'>Âge</th>
            <th className='pt-3' style={dottedBorder}>
              : {fkPatient?.age && `${formatNumberWithSpaces(fkPatient.age)} an(s)`}
            </th>
          </tr>
          </thead>
        </table>
      </div>
      
      <SignesVitauxTable signes={signes} />
      
      {documentSuivi && <ObserDocSuiviTable doc={documentSuivi} />}
      
      <HospFooter agent={fkAgent}/>
    </>
)
  
}
