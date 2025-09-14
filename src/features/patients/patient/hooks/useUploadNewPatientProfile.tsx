import type {PatientImage} from "../model/patientService.ts";
import type {Dispatch, RefObject, SetStateAction} from "react";
import {useEffect, useRef} from "react";
import {useUpdatePatientMutation} from "../model/patient.api.slice.ts";
import {onUpdatePatientProfileSubmit} from "../model/patientService.ts";

export default function useUploadNewPatientProfile(
  state: PatientImage,
  setState: Dispatch<SetStateAction<PatientImage>>,
  onRefresh: () => void
): void {
  
  const [onUpdatePatient] = useUpdatePatientMutation();
  const hasSubmittedRef: RefObject<boolean> = useRef(false)
  
  useEffect(() => {
    const file = state.file?.[0]?.file;
    
    if (file && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true
      
      const handleSubmit = async (): Promise<void> => {
        try {
          await onUpdatePatientProfileSubmit(
            state,
            setState,
            onUpdatePatient,
            onRefresh
          )
        } finally {
          hasSubmittedRef.current = false // Reset si tu veux permettre une nouvelle soumission plus tard
        }
      };
      
      handleSubmit();
    }
  }, [state.file]); // ← Se déclenche uniquement quand `file` change
}
