import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import HospList from "./HospList.tsx";

const HospitalisationView = () => {
  
  useDocumentTitle('Hospitalisation')
  useActivePage('treats')

  return (
    <BodyContainer>
      <PageTitles title="List des fiches d'hospitalisations"/>
      <Card>
        <HospList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(HospitalisationView)
