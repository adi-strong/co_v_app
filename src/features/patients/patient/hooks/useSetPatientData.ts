import type {Patient, SavePatient} from "../model/patientService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SingleValue} from "react-select";
import type {SelectOptionType} from "../../../../services/services.ts";

export default function useSetPatientData(data?: Patient, setPatient?: Dispatch<SetStateAction<SavePatient>>): void {
  
  useEffect((): void => {
    if (data && setPatient) {
      const fkStructure: SingleValue<SelectOptionType> | null = data?.fkStructure ? {
        label: data.fkStructure.nom.toUpperCase(),
        value: data.fkStructure.nom.toUpperCase(),
        data: data.fkStructure['@id'],
      } : null
      
      setPatient(prev => ({
        ...prev,
        id: data.id,
        etatCivil: data.etatCivil,
        email: data?.email ?? '',
        nom: data.nom,
        tel: data.tel,
        estCeConventionne: data.estCeConventionne,
        lieuDeNaissance: data?.lieuDeNaissance ?? '',
        sexe: data?.sexe ?? '',
        pere: data?.pere ?? '',
        mere: data?.mere ?? '',
        prenom: data?.prenom ?? '',
        adresse: data?.adresse ?? '',
        dateDeNaissance: data?.dateDeNaissance ? data.dateDeNaissance.substring(0, 10) : '',
        postNom: data?.postNom ?? '',
        nationalite: data?.nationalite ?? '',
        fkStructure,
      }))
    }
  }, [data, setPatient])
  
}
