import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import MessApi from "../Api";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { IToken, Type, IData, IQuery1, IRes, IUser } from "@/types/type";

const UserEndpoints = MessApi.injectEndpoints({
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
        getUser:build.query<IData,number>({
            query:(id:number):string=>`user/${id}`,
            providesTags:['user']
          }),
          delUser:build.mutation<IData[],Type<number>>({
            query:(id:Type<number>):IRes<unknown>=>({
              url:`user/${id}`,
              method:'DELETE'
             }),
            invalidatesTags:['user']
          }),
          addUser:build.mutation<IToken,IUser>({
            query:(body:IUser):IRes<IUser>=>({
              url:'user',
              method:'POST',
              body
              }),
            invalidatesTags:['user']
          }),
          chanUser:build.mutation<IData[],IQuery1>({
            query:({id,...body}:IQuery1):IRes<IUser>=>({
             url:`user/${id}`, 
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