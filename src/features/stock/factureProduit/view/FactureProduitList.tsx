import FactureProduitData from "./FactureProduitData.tsx";
import {useState} from "react";

export default function FactureProduitList() {
  
  const [factures, setFactures] = useState([])
  
  return (
    <>
      <FactureProduitData
        factures={factures}
        setFactures={setFactures}
      />
    </>
  )
  
}
