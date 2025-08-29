import {useState} from "react";
import DocumentData from "./DocumentData.tsx";

export default function DocumentList() {
  
  const [docs, setDocs] = useState([])
  
  return (
    <>
      <DocumentData docs={docs} />
    </>
  )
  
}
