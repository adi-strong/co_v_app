import type {DocumentSuivi} from "../model/documentSuiviService.ts";
import ObserDocSuiviTable2 from "./ObserDocSuiviTable2.tsx";
import {etatCivilLabel, formatNumberWithSpaces, sexLabel} from "../../../../services/services.ts";
import {HospFooter, HospitalHeader} from "../../../../components";

export default function UniqueDocSuiviData({ doc }: { doc: DocumentSuivi }) {
  
  const { fkPatient } = doc
  const {
    nom,
    sexe,
    etatCivil,
    age,
    postNom,
    prenom,
    tel,
    fkStructure,
  } = fkPatient
  
  return (
    <>
      <HospitalHeader />
      
      <table className='w-100'>
        <thead>
        <tr>
          <th colSpan={4} className='px-1 pe-1 border-1 border-black text-dark bg-light text-center'>
            FICHE DE SUIVI DU(DE LA) PATIENT(E) n°{formatNumberWithSpaces(doc.id)}
          </th>
        </tr>
        </thead>
        
        <tbody>
        <tr>
          <td className='px-1 pe-1 border-1 border-black text-dark fw-bold'>Nom</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>{nom}</td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark bg-light fw-bold'>État-civil</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>
            {etatCivil ? etatCivilLabel[etatCivil] : 'xxx'}
          </td>
        </tr>
        
        <tr>
          <td className='px-1 pe-1 border-1 border-black text-dark fw-bold'>Postnom</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>{postNom ? postNom : 'xxx'}</td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark bg-light fw-bold'>Âge</td>
          <td className='px-1 pe-1 border-1 border-black text-dark'>
            {age ? formatNumberWithSpaces(age)+' an(s)' : 'xxx'}
          </td>
        </tr>
        
        <tr>
          <td className='px-1 pe-1 border-1 border-black text-dark fw-bold'>Prénom</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>{prenom ? prenom : 'xxx'}</td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark bg-light fw-bold'>N° Tél.</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>{tel ? tel : 'xxx'}</td>
        </tr>
        
        <tr>
          <td className='px-1 pe-1 border-1 border-black text-dark fw-bold'>Sexe</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>
            {sexe ? sexLabel[sexe] : 'xxx'}
          </td>
          
          <td className='px-1 pe-1 border-1 border-black text-dark bg-light fw-bold'>Est-ce un(e) convionné(e)</td>
          <td className='px-1 pe-1 border-1 border-black text-dark text-uppercase'>
            {fkStructure ? fkStructure.nom : 'xxx'}
          </td>
        </tr>
        </tbody>
      </table>
      
      <ObserDocSuiviTable2 doc={doc} />
      
      <HospFooter
        agent={doc?.fkConsultation && doc.fkConsultation?.fkAgent ? doc.fkConsultation.fkAgent : undefined}
      />
    </>
  )
  
}
