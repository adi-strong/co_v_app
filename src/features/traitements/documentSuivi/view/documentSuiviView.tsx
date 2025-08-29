import {memo} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import DocumentList from "./DocumentList.tsx";

const DocumentSuiviView = () => {
  
  useDocumentTitle('Fiches de suivi')
  useActivePage('treats')

  return (
    <BodyContainer>
      <PageTitles title='Fiches de suivi des patients'/>
      <Card>
        <DocumentList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(DocumentSuiviView)
