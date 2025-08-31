import {useState} from "react";
import PerteData from "./PerteData.tsx";

export default function PerteProdList() {
  
  const [pertes, setPertes] = useState([])
  
  return <PerteData pertes={pertes} />
  
}
