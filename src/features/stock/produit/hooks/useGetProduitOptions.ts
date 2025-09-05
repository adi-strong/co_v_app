import type {Dispatch, SetStateAction} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useMemo} from "react";
import {useGetProduitsQuery} from "../model/produit.api.slice.ts";

export default function useGetProduitOptions(setLotsOptions?: Dispatch<SetStateAction<SelectOptionType[]>>) {
  const { data: produits = [], isSuccess } = useGetProduitsQuery('LIST');
  
  return useMemo(() => {
    if (!isSuccess || produits.length === 0) return [];
    
    const options: SelectOptionType[] = [];
    const allLotOptions: SelectOptionType[] = [];
    
    produits.forEach(({ id, nom, lotProduits = [] }) => {
      const subData: SelectOptionType[] = lotProduits.map(({ id: lotId, nom }) => ({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/lot_produits/${id}`,
        id: lotId,
      }));
      
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/produits/${id}`,
        subData,
      });
      
      allLotOptions.push(...subData);
    });
    
    if (setLotsOptions) setLotsOptions(allLotOptions);
    
    return options;
  }, [produits, isSuccess, setLotsOptions]);
}
