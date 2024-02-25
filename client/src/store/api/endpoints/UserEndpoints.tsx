import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import MessApi from "../Api";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { Token, Type, data, query1, res, user } from "../../../types/type";

const UserEndpoints = MessApi.injectEndpoints({
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
        getUser:build.query<data,number>({
            query:(id:number):string=>`user/${id}`,
            providesTags:['user']
          }),
          delUser:build.mutation<data[],Type<number>>({
            query:(id:Type<number>):res<unknown>=>({
              url:`user/${id}`,
              method:'DELETE'
             }),
            invalidatesTags:['user']
          }),
          addUser:build.mutation<Token,user>({
            query:(body:user):res<user>=>({
              url:'user',
              method:'POST',
              body
              }),
            invalidatesTags:['user']
          }),
          chanUser:build.mutation<data[],query1>({
            query:({id,...body}:query1):res<user>=>({
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