import {useState} from "react";
import ApproData from "../../../stock/appro/view/ApproData.tsx";

export default function HospList() {
  
  const [hosps, setHosps] = useState([])
  
  return (
    <>
      <ApproData appros={hosps} />
    </>
  )
  
}
