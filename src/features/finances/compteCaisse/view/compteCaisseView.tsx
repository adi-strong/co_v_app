import {memo, ReactNode} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {ParamLayout} from "../../../../layouts";
import {BodyContainer, PageTitles} from "../../../../components";
import ComptesList from "./ComptesList.tsx";

const CompteCaisseView = () => {

  useActivePage('finances')
  useDocumentTitle('Comptes caisses')
  
  return (
    <BodyContainer>
      <PageTitles title='Caisse' />
      <ParamLayout
        title='Comptes caisses'
        loader={false}
        onRefresh={(): void => { }}
        subTitle='Liste des comptes'
        children={(<ComptesList/>) as ReactNode}
      />
    </BodyContainer>
  )
  
};

export default memo(CompteCaisseView)
