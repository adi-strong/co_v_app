import type {Dispatch, SetStateAction} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useMemo} from "react";
import {useGetProduitsQuery} from "../model/produit.api.slice.ts";
import type {Produit} from "../model/produitService.ts";
import type {LotProduit} from "../../lotProduit/model/lotProduitService.ts";

export default function useGetProduitOptions(setLotsOptions?: Dispatch<SetStateAction<SelectOptionType[]>>) {
  const { data: produits = [], isSuccess } = useGetProduitsQuery('LIST');
  
  return useMemo(() => {
    if (!isSuccess || produits.length === 0) return [];
    
    const options: SelectOptionType[] = [];
    const allLotOptions: SelectOptionType[] = [];
    
    produits.forEach(({ id, nom, fkUnite, lotProduits = [] }: Produit) => {
      const subData: SelectOptionType[] = lotProduits.map(({ id: lotId }: LotProduit) => ({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/lot_produits/${id}`,
        id: lotId,
      }));
      
      const data: { uniteID: number; unite: string | null } = {
        unite: fkUnite ? fkUnite.nom : '',
        uniteID: fkUnite ? fkUnite.id : 0
      }
      
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data,
        id,
        subData,
      });
      
      allLotOptions.push(...subData);
    });
    
    if (setLotsOptions) setLotsOptions(allLotOptions);
    
    return options;
  }, [produits, isSuccess, setLotsOptions]);
}
