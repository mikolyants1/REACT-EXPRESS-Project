import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import MessApi from "../Api";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { Type, data, query1, res, user } from "../../../types/type";

const UserEndpoints = MessApi.injectEndpoints({
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
        getUser:build.query<data,number>({
            query:(id):string=>`user/${id}`,
            providesTags:['user']
          }),
          getUsers:build.query<data[],unknown>({
            query:():string=>'user',
            providesTags:['user'],
          }),
          delUser:build.mutation<data[],Type<number>>({
            query:(id):res<unknown>=>({
              url:`user/${id}`,
              method:'DELETE'
             }),
            invalidatesTags:['user']
          }),
          addUser:build.mutation<data[],user>({
            query:(body):res<user>=>({
              url:'user',
              method:'POST',
              body:body
              }),
            invalidatesTags:['user']
          }),
          chanUser:build.mutation<data[],query1>({
            query:(obj):res<user>=>{
            const {id,...body}:query1 = obj
            return {
             url:`user/${id}`, 
             method:'PUT',
             body:body
              }
            },
            invalidatesTags:['user']
          })
    })
});

export const {
  useGetUserQuery,
  useAddUserMutation,
  useChanUserMutation,
  useDelUserMutation,
  useGetUsersQuery
} = UserEndpoints