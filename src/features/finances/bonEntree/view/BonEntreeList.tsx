import type {BonEntree} from "../model/bonEntreeService.ts";
import BonEntreeData from "./BonEntreeData.tsx";

export default function BonEntreeList({ entries, onRefresh, isFetching, loader }: {
  entries: BonEntree[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <BonEntreeData
        entries={entries}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
