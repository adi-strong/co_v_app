import {Dispatch, SetStateAction} from "react";
import FournisseurData from "./FournisseurData.tsx";
import type {Fournisseur} from "../model/fournisseurService.ts";

export default function FournisseurList({ fournisseurs, setFournisseurs, onRefresh, isFetching, loader }: {
  fournisseurs: Fournisseur[]
  setFournisseurs: Dispatch<SetStateAction<Fournisseur[]>>
  onRefresh: () => void
  loader: boolean
  isFetching: boolean
}) {
  
  return (
    <>
      <FournisseurData
        fournisseur={fournisseurs}
        setFournisseurs={setFournisseurs}
        onRefresh={onRefresh}
        loader={loader}
        isFetching={isFetching}
      />
    </>
  )
  
}
