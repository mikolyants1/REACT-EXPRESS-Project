import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { api } from '../../types/type';

const MessApi = createApi({
    reducerPath:'Mess',
    refetchOnFocus:true,
    tagTypes:['dialog','user'],
    baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:5000/',
      prepareHeaders:(headers:Headers,{getState}:api):Headers=>{
        const get:any = getState();
        const token:string = get.mess.authToken;
        if (token){
        headers.set("authorization",`Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints:()=>({})
  }) 


 export default MessApi;