import {useState} from "react";
import {getFournisseurFakeData} from "../model/fournisseurService.ts";
import FournisseurData from "./FournisseurData.tsx";

export default function FournisseurList() {
  
  const [fournisseurs, setFournisseurs] = useState(getFournisseurFakeData())
  
  return (
    <>
      <FournisseurData
        fournisseur={fournisseurs}
        setFournisseurs={setFournisseurs}
      />
    </>
  )
  
}
