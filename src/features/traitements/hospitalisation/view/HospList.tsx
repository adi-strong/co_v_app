import HospData from "./HospData.tsx";
import type {Hospitalisation} from "../model/hospitalisationService.ts";

export default function HospList({ hosps, onRefresh, isFetching, loader }: {
  hosps: Hospitalisation[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <HospData
        hosps={hosps}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
