import {Dispatch, SetStateAction} from "react";
import PrescriptionData from "./PrescriptionData.tsx";
import type {Prescription} from "../model/prescriptionService.ts";

export default function PrescriptionsList({ prescriptions, setPrescriptions, onRefresh, isFetching, loader }: {
  prescriptions: Prescription[]
  setPrescriptions: Dispatch<SetStateAction<Prescription[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <PrescriptionData
        prescriptions={prescriptions}
        setPrescriptions={setPrescriptions}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
