import LabData from "./LabData.tsx";
import type {Lab} from "../model/labService.ts";

export default function LabList({ labs, onRefresh, isFetching, loader }: {
  labs: Lab[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <LabData
        labs={labs}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
