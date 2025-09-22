import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {SaveService, Service} from "./serviceService.ts";

let totalServicesItems: number = 0

const serviceApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postService: build.mutation<Service, SaveService>({
      query: (data: SaveService) => ({
        url: `${API_PATH}/services`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          fkDepartement: data?.fkDepartement ? data.fkDepartement?.data : null,
        }),
        invalidatesTags: ['UNIQUE', 'LIST']
      })
    }),
    
    getServices: build.query<Service[], string>({
      query: () => `${API_PATH}/services`,
      transformResponse: (response: JsonLDResponseInt<Service>) => {
        totalServicesItems = response.totalItems
        return response.member;
      },
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return [
            ...result.map(({ id }) => ({ type: 'UNIQUE' as const, id })),
            { type: 'LIST' as const, id: 'LIST' }
          ]
        }
        return [{ type: 'LIST' as const, id: 'LIST' }];
      }
    }),
    
    getServicesByDepartment: build.query<Service[], string | number>({
      query: (departmentId: string | number) => `${API_PATH}/departements/${departmentId}/services`,
      transformResponse: (response: JsonLDResponseInt<Service>) => {
        totalServicesItems = response.totalItems
        return response.member;
      },
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return [
            ...result.map(({ id }) => ({ type: 'UNIQUE' as const, id })),
            { type: 'LIST' as const, id: 'LIST' }
          ]
        }
        return [{ type: 'LIST' as const, id: 'LIST' }];
      }
    }),
    
    editService: build.mutation<Service, SaveService>({
      query: (data: SaveService) => ({
        url: `${API_PATH}/services/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          ...data,
          fkDepartement: data?.fkDepartement ? data.fkDepartement?.data : null,
        })
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),
    
    deleteService: build.mutation<void, Service>({
      query: (data: Service) => ({
        url: `${API_PATH}/services/${data.id}`,
        method: APP_METHODS.DELETE
      }),
      invalidatesTags: ['UNIQUE', 'LIST']
    }),
    
    getUniqueService: build.query<Service, string | number | undefined>({
      query: id => `${API_PATH}/services/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  usePostServiceMutation,
  useGetServicesQuery,
  useEditServiceMutation,
  useDeleteServiceMutation,
  useGetUniqueServiceQuery,
  useGetServicesByDepartmentQuery,
} = serviceApiSlice
