import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const MessApi = createApi({
    reducerPath:'Mess',
    refetchOnFocus:true,
    tagTypes:['dialog','user'],
    baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:5000/'
    }),
    endpoints:()=>({})
  }) 


 export default MessApi;