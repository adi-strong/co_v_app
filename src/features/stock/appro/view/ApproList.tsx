import {useState} from "react";
import ApproData from "./ApproData.tsx";

export default function ApproList() {
  
  const [appros, setAppros] = useState([])
  
  return (
    <>
      <ApproData appros={appros} />
    </>
  )
  
}
