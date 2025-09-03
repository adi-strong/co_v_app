import {API} from "../../../app/store";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../../config/configs.ts";
import type {JsonLDResponseInt} from "../../../../interfaces/JsonLDResponseInt.ts";
import type {Agent, SaveAgent} from "./agentService.ts";

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
      })
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
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    deleteAgent: build.mutation<void, Agent>({
      query: (data: Agent) => ({
        url: `${API_PATH}/agents/${data.id}`,
        method: APP_METHODS.DELETE
      })
    }),

  })
  
})

export const {
  useGetAgentsQuery,
  useGetUniqueAgentQuery,
  usePostAgentMutation,
  useEditAgentMutation,
  useDeleteAgentMutation,
} = agentApiSlice
