import {useState} from "react";
import PrescriptionData from "./PrescriptionData.tsx";

export default function PrescriptionsList() {
  
  const [fournisseurs, setFournisseurs] = useState([])
  
  return (
    <>
      <PrescriptionData
        prescriptions={fournisseurs}
        setPrescriptions={setFournisseurs}
      />
    </>
  )
  
}
