import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TApi } from "../../../../libs/types/type";
import { RootState } from "../../store/store";

export const UserApi = createApi({
    reducerPath:"UserApi",
    refetchOnFocus:true,
    tagTypes:["user"],
    baseQuery:fetchBaseQuery({
      baseUrl:"http://localhost:5000/user",
      prepareHeaders:(headers:Headers,{getState}:TApi) => {
        const get:RootState = getState();
        const token:string = get.mess.authToken;
        if (token){
          headers.set("authorization",`Bearer ${token}`);
        }
        return headers;
      }
    }),
    endpoints:()=>({})
});
