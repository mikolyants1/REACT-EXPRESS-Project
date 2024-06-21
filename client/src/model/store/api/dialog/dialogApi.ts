import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../../store/store";
import { TApi } from "../../../../libs/types/type";

export const DialogApi = createApi({
    reducerPath:"DialogApi",
    refetchOnFocus:true,
    tagTypes:["user"],
    baseQuery:fetchBaseQuery({
      baseUrl:"http://localhost:5000/dialog",
      prepareHeaders:(headers:Headers,{getState}:TApi) => {
       const get = getState() as RootState;
       const token:string = get.mess.authToken;
       if (token){
         headers.set("authorization",`Bearer ${token}`);
       }
       return headers;
      }
    }),
    endpoints:()=>({})
})