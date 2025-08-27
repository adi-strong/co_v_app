import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import PatientList from "./PatientList.tsx";

const PatientView = () => {
  
  useDocumentTitle('Patients')
  useActivePage('patients')
  
  return (
    <BodyContainer>
      <PageTitles title='Patients' />
      
      <Card>
        <PatientList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(PatientView)
