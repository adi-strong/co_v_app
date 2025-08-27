import {memo, ReactNode, useState} from 'react';
import {BodyContainer} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {ParamLayout} from "../../../../layouts";
import InfosGenList from "./infosGenList.tsx";
import {getInfosGenFakeData} from "../model/infosGenService.ts";

const InfosGenView = () => {
  
  useDocumentTitle('Paramètres généraux')
  useActivePage('params')
  
  const [infos /*, setInfos */] = useState(getInfosGenFakeData()[0])

  return (
    <BodyContainer>
      <ParamLayout
        title='Réglages généraux'
        loader={false}
        onRefresh={() => {}}
        subTitle='Paramètres généraux'
        children={(<InfosGenList infos={infos} />) as ReactNode}
      />
    </BodyContainer>
  )
  
};

export default memo(InfosGenView)
