import type {Dispatch, SetStateAction} from "react";
import {useMemo} from "react";
import type {SelectOptionType} from "../../../../services/services.ts";
import {useGetDepartementsQuery} from "../model/departement.api.slice.ts";

export default function useGetDepartmentsOptions(setServicesOptions?: Dispatch<SetStateAction<SelectOptionType[]>>) {
  const { data: departments = [], isSuccess } = useGetDepartementsQuery('LIST');

  return useMemo(() => {
    if (!isSuccess || departments.length === 0) return [];
    
    const options: SelectOptionType[] = [];
    const allServiceOptions: SelectOptionType[] = [];
    
    departments.forEach(({id, nom, services = []}) => {
      const subData: SelectOptionType[] = services.map(({ id, nom }) => ({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/services/${id}`,
      }));
      
      options.push({
        label: nom.toUpperCase(),
        value: nom.toUpperCase(),
        data: `/api/departements/${id}`,
        subData,
      });
      
      allServiceOptions.push(...subData);
    });
    
    if (setServicesOptions) setServicesOptions(allServiceOptions);
    
    return options;
  }, [departments, isSuccess, setServicesOptions]);
}
