import {useState} from "react";
import ConsultData from "./ConsultData.tsx";

export default function ConsultationList() {
  
  const [consultations, setConsultations] = useState([])
  
  return (
    <>
      <ConsultData consultations={consultations} />
    </>
  )
  
}

