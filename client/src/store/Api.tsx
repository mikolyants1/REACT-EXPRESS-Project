import {createApi,fetchBaseQuery,BaseQueryFn} from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Type } from '../Component/Main'

export interface mess{
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}
interface query1{
  id:number,
  name:string,
  phone:string
}
interface query2{
  id1:string,
  id2:string,
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}
interface user{
 name:string,
 phone:string
}
export interface message{
  id:number,
  mess:mess[]
}
export interface data{
  id:number,
  name:string,
  phone:string,
  message:message[]
}
interface body{
  text:string,
  date:string,
  now:number,
  day:number,
  month:string,
  id:string
}
interface res<T> {
  url:string,
  method:string,
  body?:T
}

const MessApi = createApi({
    reducerPath:'Mess',
    refetchOnFocus:true,
    tagTypes:['dialog','user'],
    baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:5000/'
    }),
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
      getMess:build.query<data,string>({
        query:(id):string=>`dialog/${id}`,
        providesTags:['dialog']
       }),
      setMess:build.mutation<data[],query2>({
        query:(obj):res<body>=>{
         const {id1,id2,...body}:query2 = obj
            return {
              url:`dialog/${id1}`,
              method:'POST',
              body: {id:id2,...body}
               }    
            },
           invalidatesTags:['dialog'] 
        }),
      getUser:build.query<data,Type<string>>({
         query:(id):string=>`user/${id}`,
          providesTags:['user']
        }),
      getUsers:build.query<data[],unknown>({
          query:():string=>'user',
          providesTags:['user']
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
 }) 
export const {
    useAddUserMutation,
    useChanUserMutation,
    useDelUserMutation,
    useGetMessQuery,
    useGetUserQuery,
    useGetUsersQuery,
    useSetMessMutation
  } = MessApi

 export default MessApi