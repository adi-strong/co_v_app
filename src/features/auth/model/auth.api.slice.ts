import {API} from "../../app/store";
import {APP_METHODS} from "../../../config/configs";

const authApiSlice = API.injectEndpoints({

  endpoints: build => ({
    
    postAuth: build.mutation({
      query: data => ({
        url: '/auth',
        method: APP_METHODS.POST,
        body: data
      }),
    }),

  })
  
})

export const { usePostAuthMutation } = authApiSlice
