import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import ConsultationList from "./ConsultationList.tsx";
import {Card} from "react-bootstrap";

const ConsultationView = () => {
  
  useDocumentTitle('Fiches de consultation')
  useActivePage('treats')

  return (
    <BodyContainer>
      <PageTitles title='Fiches de consultation'/>
      <Card>
        <ConsultationList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ConsultationView)
