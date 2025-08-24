import {useState} from "react";
import FactureDocData from "./FactureDocData.tsx";

export default function FactureDocList() {
  
  const [factures/* , setFactures */] = useState([])
  
  return <FactureDocData factures={factures} />
  
}
