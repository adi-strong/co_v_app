import {useState} from "react";
import SortieProdData from "./SortieProdData.tsx";

export default function SortieProdList() {
  
  const [sorties, setSorties] = useState([])
  
  return <SortieProdData sorties={sorties} />
  
}
