import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { IToken, Type, IData, IQuery1, IRes, IUser } from "../../../../libs/types/type";
import { UserApi } from "../user/userApi";

const UserEndpoints = UserApi.injectEndpoints({
  endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
    getUser:build.query<IData,number>({
      query:(id:number):string=>`/${id}`,
      providesTags:['user']
    }),
    delUser:build.mutation<IData[],Type<number>>({
      query:(id:Type<number>):IRes<unknown>=>({
        url:`/${id}`,
        method:'DELETE'
      }),
      invalidatesTags:['user']
    }),
    addUser:build.mutation<IToken,IUser>({
      query:(body:IUser):IRes<IUser>=>({
        url:'/',
        method:'POST',
        body
      }),
      invalidatesTags:['user']
    }),
    chanUser:build.mutation<IData[],IQuery1>({
      query:({id,...body}:IQuery1):IRes<IUser>=>({
        url:`/${id}`, 
        method:'PUT',
        body
      }),
      invalidatesTags:['user']
    }),
  })
});

export const {
  useGetUserQuery,
  useAddUserMutation,
  useChanUserMutation,
  useDelUserMutation
} = UserEndpoints