import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { IToken, Type, IData, IQuery1, IRes, IUser } from "../../../../libs/types";
import { MessangerApi } from "../MessangerApi";

const UserEndpoints = MessangerApi.injectEndpoints({
  endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
    getUser:build.query<IData,number>({
      query:(id:number) => `/${id}`,
      providesTags:["messanger"]
    }),
    delUser:build.mutation<IData[],Type<number>>({
      query:(id:Type<number>):IRes<unknown>=>({
        url:`/${id}`,
        method:'DELETE'
      }),
      invalidatesTags:["messanger"]
    }),
    addUser:build.mutation<IToken,IUser>({
      query:(body:IUser):IRes<IUser>=>({
        url:'/',
        method:'POST',
        body
      }),
      invalidatesTags:["messanger"]
    }),
    chanUser:build.mutation<IData[],IQuery1>({
      query:({id,...body}:IQuery1):IRes<IUser>=>({
        url:`/${id}`, 
        method:'PUT',
        body
      }),
      invalidatesTags:["messanger"]
    }),
  })
});

export const {
  useGetUserQuery,
  useAddUserMutation,
  useChanUserMutation,
  useDelUserMutation
} = UserEndpoints