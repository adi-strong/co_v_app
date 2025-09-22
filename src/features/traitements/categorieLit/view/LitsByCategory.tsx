import type {CategorieLit} from "../model/categorieLitService.ts";
import {useGetLitsByCategoryQuery} from "../../lit/model/lit.api.slice.ts";
import {useState} from "react";
import type {Lit} from "../../lit/model/litService.ts";
import useSetLitItems from "../../lit/hooks/useSetLitItems.ts";
import LitsList from "../../lit/view/LitsList.tsx";

export default function LitsByCategory({ category }: { category: CategorieLit }) {
  
  const { data, isLoading, isFetching, refetch } = useGetLitsByCategoryQuery(category.id)
  
  const [lits, setLits] = useState<Lit[]>([])
  
  useSetLitItems(data, setLits)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <>
      <LitsList
        setLits={setLits}
        lits={lits}
        onRefresh={onRefresh}
        loader={isLoading}
        isFetching={isFetching}
      />
    </>
  )
  
}
