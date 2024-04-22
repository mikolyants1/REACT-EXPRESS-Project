import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IApi } from '../../types/type';
import { RootState } from '../store/store';

const MessApi = createApi({
  reducerPath:'Mess',
  refetchOnFocus:true,
  tagTypes:['user'],
  baseQuery:fetchBaseQuery({
    baseUrl:'http://localhost:5000/',
    prepareHeaders:(headers:Headers,{getState}:IApi):Headers=>{
      const get:RootState = getState();
      const token:string = get.mess.authToken;
      if (token) {
       headers.set("authorization",`Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints:()=>({})
});


 export default MessApi;