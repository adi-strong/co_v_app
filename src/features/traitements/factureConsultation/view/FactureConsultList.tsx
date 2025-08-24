import {useState} from "react";
import FactureConsultData from "./FactureConsultData.tsx";

export default function FactureConsultList() {
  
  const [factures/* , setFactures */] = useState([])
  
  return <FactureConsultData factures={factures} />
  
}
