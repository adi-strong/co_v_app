import {memo} from 'react';
import {useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import LabList from "./LabList.tsx";

const LabView = () => {
  
  useDocumentTitle('Laboratoire')

  return (
    <BodyContainer>
      <PageTitles title="Liste des documents d'analyses au labo"/>
      <Card>
        <LabList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(LabView)
