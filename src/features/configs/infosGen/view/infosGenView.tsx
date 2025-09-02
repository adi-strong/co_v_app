import {memo, ReactNode, useState} from 'react';
import {BodyContainer} from "../../../../components";
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {ParamLayout} from "../../../../layouts";
import InfosGenList from "./infosGenList.tsx";
import {useSelector} from "react-redux";
import type {InfoGenState} from "../model/infosGen.slice.ts";
import useSetInfosGenDataItem from "../hooks/useSetInfosGenDataItem.ts";
import type {InfosGen} from "../model/infosGenService.ts";

const InfosGenView = () => {
  
  useDocumentTitle('Paramètres généraux')
  useActivePage('params')
  
  const [state, setState] = useState<InfosGen | null>(null)
  
  const { infos } = useSelector((state: InfoGenState) => state.infos)
  
  useSetInfosGenDataItem(infos, setState)

  return (
    <BodyContainer>
      <ParamLayout
        title='Réglages généraux'
        loader={false}
        onRefresh={() => {}}
        subTitle='Paramètres généraux'
        children={state && (<InfosGenList infos={state} />) as ReactNode}
      />
    </BodyContainer>
  )
  
};

export default memo(InfosGenView)
