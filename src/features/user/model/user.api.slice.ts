import type {PassType, SaveUser, User} from "./userService.ts";
import {API_PATH, APP_HEADERS, APP_METHODS} from "../../../config/configs.ts";
import {API} from "../../app/store.ts";
import type {JsonLDResponseInt} from "../../../interfaces/JsonLDResponseInt.ts";

let totalUsersItems: number = 0

const userApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postUser: build.mutation<User, SaveUser>({
      query: (data: SaveUser) => ({
        url: `${API_PATH}/users`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          ...data,
          fkAgent: data?.fkAgent ? data.fkAgent.data : null,
          roles: data.roles.length > 0 ? data.roles.map(r => r?.data) : []
        })
      })
    }),
    
    getUsers: build.query<User[], string>({
      query: () => `${API_PATH}/users`,
      transformResponse: (response: JsonLDResponseInt<User>) => {
        totalUsersItems = response.totalItems
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
    
    editUser: build.mutation<User, SaveUser>({
      query: (data: SaveUser) => ({
        url: `${API_PATH}/users/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({
          roles: data.roles.length > 0 ? data.roles.map(r => r?.data) : [],
          fkAgent: data?.fkAgent ? data.fkAgent.data : null,
          fullName: data?.fullName ? data.fullName : null,
          username: data.username,
          tel: data?.tel,
          active: !!data?.active,
          email: data?.email ?? null,
        })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    resetUserPassword: build.mutation<User, PassType>({
      query: (data) => ({
        url: `${API_PATH}/reset_user_password`,
        method: APP_METHODS.POST,
        headers: APP_HEADERS.POST_HEADERS,
        body: JSON.stringify({
          userId: Number(data.userId),
          password: data.password,
        })
      }),
      invalidatesTags: ['LIST']
    }),
    
    deleteUser: build.mutation<User, User>({
      query: (data) => ({
        url: `${API_PATH}/users/${data?.id}`,
        method: APP_METHODS.PATCH,
        headers: APP_HEADERS.PATCH_HEADERS,
        body: JSON.stringify({ deleted: true })
      }),
      invalidatesTags: (result, error, arg) => [{
        id: arg.id,
        type: 'UNIQUE',
      }]
    }),
    
    getUniqueUser: build.query<User, string | number | undefined>({
      query: id => `${API_PATH}/users/${id}`,
      providesTags: (result, error, arg) => [{
        type: 'UNIQUE',
        id: arg
      }]
    }),

  })
  
})

export const {
  usePostUserMutation,
  useGetUsersQuery,
  useEditUserMutation,
  useResetUserPasswordMutation,
  useDeleteUserMutation,
  useGetUniqueUserQuery,
  useLazyGetUniqueUserQuery,
} = userApiSlice
