import ConsultData from "./ConsultData.tsx";
import type {Consultation} from "../model/consultationService.ts";

export default function ConsultationList({ consultations, onRefresh, isFetching, loader }: {
  consultations: Consultation[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <ConsultData
        consultations={consultations}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
