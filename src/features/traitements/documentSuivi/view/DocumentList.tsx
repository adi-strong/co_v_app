import DocumentData from "./DocumentData.tsx";
import type {DocumentSuivi} from "../model/documentSuiviService.ts";

export default function DocumentList({ docs, onRefresh, isFetching, loader }: {
  docs: DocumentSuivi[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <DocumentData
        docs={docs}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
