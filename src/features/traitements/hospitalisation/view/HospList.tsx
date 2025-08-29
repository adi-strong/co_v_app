import {useState} from "react";
import HospData from "./HospData.tsx";

export default function HospList() {
  
  const [hosps, setHosps] = useState([])
  
  return (
    <>
      <HospData hosps={hosps} />
    </>
  )
  
}
