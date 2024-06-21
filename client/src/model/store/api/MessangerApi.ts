import { TApi } from "../../../libs/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store/store";

export const MessangerApi = createApi({
  reducerPath:"MessangerApi",
  refetchOnFocus:true,
  tagTypes:["messanger"],
  baseQuery:fetchBaseQuery({
    baseUrl:"http://localhost:5000/",
    prepareHeaders:(headers:Headers,{getState}:TApi) => {
      const state = getState() as RootState;
      const token = state.mess.authToken;
      if (token) {
        headers.set("authorization",`Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints:() => ({})
});