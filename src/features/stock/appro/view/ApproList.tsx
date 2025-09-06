import {Dispatch, SetStateAction} from "react";
import ApproData from "./ApproData.tsx";
import type {Appro} from "../model/approService.ts";

export default function ApproList({ appros, onRefresh, isFetching, loader }: {
  appros: Appro[]
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <ApproData
        appros={appros}
        loader={loader}
        isFetching={isFetching}
        onRefresh={onRefresh}
      />
    </>
  )
  
}
