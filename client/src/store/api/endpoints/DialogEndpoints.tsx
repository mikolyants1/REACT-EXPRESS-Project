import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
import MessApi from "../Api"
import { body, body1, data, query2,
 query3, query4, res } from "../../../types/type"

const DialogEndpoints = MessApi.injectEndpoints({
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
      setMess:build.mutation<data[],query2>({
        query:(obj):res<body>=>{
         const {id1,id2,...body}:query2 = obj;
            return {
              url:`dialog/${id1}`,
              method:'POST',
              body: {id:id2,...body}
               }    
            },
           invalidatesTags:['user'] 
        }),
        chanMess:build.mutation<data[],query3>({
          query:(obj):res<body1>=>{
           const {id1,id2,...body}:query3 = obj;
              return {
                url:`dialog/${id1}`,
                method:'PUT',
                body: {id:id2,...body}
                 }    
              },
            invalidatesTags:['user'] 
          }),
        delMess:build.mutation<data[],query4>({
          query:(obj):res<body1>=>{
           const {id1,id2,...body}:query4 = obj;
              return {
                url:`dialog/${id1}`,
                method:'DELETE',
                body: {id:id2,...body}
                }    
              },
            invalidatesTags:['user'] 
          }),
       })
    })
  export const {
    useSetMessMutation,
    useChanMessMutation,
    useDelMessMutation
  } = DialogEndpoints