import {BodyContainer, PageTitles} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {memo} from "react";

const ShowAgent = () => {
  
  useDocumentTitle('Agent')
  useActivePage('agents')
  
  return (
    <BodyContainer>
      <PageTitles title='Agent'/>
    </BodyContainer>
  )
  
}

export default memo(ShowAgent)
