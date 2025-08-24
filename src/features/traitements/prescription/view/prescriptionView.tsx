import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import PrescriptionsList from "./PrescriptionsList.tsx";

const PrescriptionView = () => {
  
  useDocumentTitle('Prescriptions')
  useActivePage('prescriptions')
  
  return (
    <BodyContainer>
      <PageTitles title='Prescriptions' />
      
      <Card>
        <PrescriptionsList />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(PrescriptionView)
