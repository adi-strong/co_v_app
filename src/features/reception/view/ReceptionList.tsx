import ReceptionData from "./ReceptionData.tsx";
import type {Reception} from "../model/receptionService.ts";

export default function ReceptionList({ receptions, onRefresh, loader, isFetching }: {
  receptions: Reception[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <ReceptionData
        receptions={receptions}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
