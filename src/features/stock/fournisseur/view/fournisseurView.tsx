import {memo, useState} from 'react';
import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {Card} from "react-bootstrap";
import FournisseurList from "./FournisseurList.tsx";
import type {Fournisseur} from "../model/fournisseurService.ts";
import useGetFournisseursItems from "../hooks/useGetFournisseursItems.ts";
import {useGetFournisseursQuery} from "../model/fournisseur.api.slice.ts";

const FournisseurView = () => {
  
  useDocumentTitle('Fournisseurs')
  useActivePage('pharmacy')
  
  const { data, isLoading, isFetching, refetch } = useGetFournisseursQuery('LIST')
  
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([])
  
  useGetFournisseursItems(data, setFournisseurs)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Fournisseurs' />
      
      <Card>
        <FournisseurList
          setFournisseurs={setFournisseurs}
          onRefresh={onRefresh}
          loader={isLoading}
          isFetching={isFetching}
          fournisseurs={fournisseurs}
        />
      </Card>
    </BodyContainer>
  )
  
};

export default memo(FournisseurView)
