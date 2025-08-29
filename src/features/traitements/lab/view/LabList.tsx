import {useState} from "react";
import LabData from "./LabData.tsx";

export default function LabList() {
  
  const [labs, setLabs] = useState([])
  
  return (
    <>
      <LabData labs={labs} />
    </>
  )
  
}
