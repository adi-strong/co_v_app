import {useState} from "react";
import ReceptionData from "./ReceptionData.tsx";
import {getReceptionsFakeData} from "../model/receptionService.ts";

export default function ReceptionList() {
  
  const [receptions/*, setReceptions*/] = useState(getReceptionsFakeData())
  
  return (
    <>
      <ReceptionData reception={receptions} />
    </>
  )
  
}
