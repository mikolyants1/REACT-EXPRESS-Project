import {createApi,fetchBaseQuery,BaseQueryFn} from '@reduxjs/toolkit/query/react'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Type, body, body1, data, query1, query2, query3, query4, res, user } from '../types/type'

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
        chanMess:build.mutation<data[],query3>({
          query:(obj):res<body1>=>{
           const {id1,id2,...body}:query3 = obj
              return {
                url:`dialog/${id1}`,
                method:'PUT',
                body: {id:id2,...body}
                 }    
              },
             invalidatesTags:['dialog'] 
          }),
        delMess:build.mutation<data[],query4>({
            query:(obj):res<body1>=>{
             const {id1,id2,...body}:query4 = obj
                return {
                  url:`dialog/${id1}`,
                  method:'DELETE',
                  body: {id:id2,...body}
                   }    
                },
               invalidatesTags:['dialog'] 
            }),
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
 }) 

export const {
    useAddUserMutation,
    useChanUserMutation,
    useDelUserMutation,
    useGetMessQuery,
    useGetUserQuery,
    useGetUsersQuery,
    useSetMessMutation,
    useChanMessMutation,
    useDelMessMutation
  } = MessApi

 export default MessApi;