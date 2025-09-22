import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Agent, SaveAgent} from "./agentService.ts";
import type {Fonction} from "../../fonction/model/fonctionService.ts";

let totalAgentsItems: number = 0

const agentApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    getAgents: build.query<Agent[], string>({
      query: () => `${API_PATH}/agents`,
      transformResponse: (response: JsonLDResponseInt<Agent>) => {
        totalAgentsItems = response.totalItems
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
    
    getAgentsByDepartment: build.query<Agent[], string | number>({
      query: (departmentId: string | number) => `${API_PATH}/departements/${departmentId}/agents`,
      transformResponse: (response: JsonLDResponseInt<Agent>) => {
        totalAgentsItems = response.totalItems
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
    
    getAgentsByService: build.query<Agent[], string | number>({
      query: (serviceId: string | number) => `${API_PATH}/services/${serviceId}/agents`,
      transformResponse: (response: JsonLDResponseInt<Agent>) => {
        totalAgentsItems = response.totalItems
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
    
    getAgentsByFunction: build.query<Agent[], string | number>({
      query: (functionId: string | number) => `${API_PATH}/fonctions/${functionId}/agents`,
      transformResponse: (response: JsonLDResponseInt<Agent>) => {
        totalAgentsItems = response.totalItems
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
    
    getAgentsByFonction: build.query<Fonction[], string>({
      query: (keywords) => `${API_PATH}/fonctions?nom=${keywords}`,
      transformResponse: (response: JsonLDResponseInt<Fonction>) => {
        totalAgentsItems = response.totalItems
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
    
    getAllAgents: build.query<Agent[], string>({
      query: () => `${API_PATH}/all_agents`,
      transformResponse: (response: JsonLDResponseInt<Agent>) => {
        totalAgentsItems = response.totalItems
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
    
    getUniqueAgent: build.query<Agent, string | number | undefined>({
      query: id => `${API_PATH}/agents/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),
    
    postAgent: build.mutation<Agent, FormData>({
      query: (data: FormData) => ({
        url: `${API_PATH}/agents`,
        method: APP_METHODS.POST,
        body: data
      }),
      invalidatesTags: ['LIST', 'UNIQUE']
    }),
    
    editAgent: build.mutation<Agent, SaveAgent>({
      query: (data: SaveAgent) => ({
        url: `${API_PATH}/agents/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          tel: data.tel,
          nom: data.nom,
          postNom: data?.postNom ?? null,
          prenom: data?.prenom ?? null,
          sexe: data?.sexe ?? null,
          email: data?.email ?? null,
          fkDepartement: data?.fkDepartement ? data.fkDepartement?.data : null,
          fkFonction: data?.fkFonction ? data.fkFonction?.data : null,
          fkService: data?.fkService ? data.fkService?.data : null,
        })
      }),
      invalidatesTags: ['LIST', 'UNIQUE']
    }),
    
    deleteAgent: build.mutation<void, Agent>({
      query: (data: Agent) => ({
        url: `${API_PATH}/agents/${data.id}`,
        method: APP_METHODS.DELETE
      }),
      invalidatesTags: ['LIST', 'UNIQUE']
    }),
    
    updateAgentProfile: build.mutation<void, FormData>({
      query: (data: FormData) => ({
        url: `${API_PATH}/agents_profile`,
        method: APP_METHODS.POST,
        body: data
      }),
      invalidatesTags: ['LIST', 'UNIQUE']
    }),

  })
  
})

export const {
  useGetAgentsQuery,
  useGetAgentsByServiceQuery,
  useGetAgentsByFunctionQuery,
  useGetAllAgentsQuery,
  useGetUniqueAgentQuery,
  usePostAgentMutation,
  useEditAgentMutation,
  useDeleteAgentMutation,
  useGetAgentsByFonctionQuery,
  useGetAgentsByDepartmentQuery,
  useUpdateAgentProfileMutation,
} = agentApiSlice
