import type {Departement} from "../model/departementService.ts";
import {useGetServicesByDepartmentQuery} from "../../service/model/service.api.slice.ts";
import {useState} from "react";
import type {Service} from "../../service/model/serviceService.ts";
import useGetFonctionsItems from "../../fonction/hooks/useGetFonctionsItems.ts";
import ServicesList from "../../service/view/ServicesList.tsx";

export default function ServicesByDepartment({ department }: { department: Departement }) {
  
  const { data, isLoading, isFetching, refetch } = useGetServicesByDepartmentQuery(department.id)
  
  const [services, setServices] = useState<Service[]>([])
  
  useGetFonctionsItems(data, setServices)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <>
      <ServicesList
        onRefresh={onRefresh}
        loader={isLoading}
        isFetching={isFetching}
        setServices={setServices}
        services={services}
      />
    </>
  )
  
}

