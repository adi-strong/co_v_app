import {memo} from 'react';
import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {Card} from "react-bootstrap";
import ApproList from "./ApproList.tsx";

const ApproView = () => {
  
  useDocumentTitle('Approvisionnements')
  useActivePage('pharmacy')

  return (
    <BodyContainer>
      <PageTitles title='Approvisionnements'/>
      <Card>
        <ApproList/>
      </Card>
    </BodyContainer>
  )
  
};

export default memo(ApproView)
