import {memo, ReactNode, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {ParamLayout} from "../../../../layouts";
import {BodyContainer, PageTitles} from "../../../../components";
import {useSelector} from "react-redux";
import type {CompteCaisseState} from "../model/compteCaisse.slice.ts";
import type {CompteCaisse} from "../model/compteCaisseService.ts";
import UniqeCaisse from "./UniqeCaisse.tsx";
import useSetCompteItem from "../hooks/useSetCompteItem.ts";
import {useGetUniqueCompteQuery} from "../model/compteCaisse.api.slice.ts";

const CompteCaisseView = () => {

  useActivePage('finances')
  useDocumentTitle('Comptes caisses')
  
  const { compte } = useSelector((state: CompteCaisseState) => state.compte)
  const { isFetching, refetch } = useGetUniqueCompteQuery(1)
  
  const [state, setState] = useState<CompteCaisse | null>(null)
  
  useSetCompteItem(compte, setState)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Caisse' />
      <ParamLayout
        title='Comptes caisses'
        loader={isFetching}
        onRefresh={onRefresh}
        subTitle='Liste des comptes'
        children={state && (<UniqeCaisse caisse={state}/>) as ReactNode}
      />
    </BodyContainer>
  )
  
};

export default memo(CompteCaisseView)
