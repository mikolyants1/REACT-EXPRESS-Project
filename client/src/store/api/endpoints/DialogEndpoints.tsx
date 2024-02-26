import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
import MessApi from "../Api"
import { IBody, IBody1, IData, IQuery2,
 Query3, Query4, IRes } from "../../../types/type"

const DialogEndpoints = MessApi.injectEndpoints({
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
      setMess:build.mutation<IData[],IQuery2>({
        query:(obj):IRes<IBody>=>{
         const {id1,id2,...body}:IQuery2 = obj;
            return {
              url:`dialog/${id1}`,
              method:'POST',
              body: {id:id2,...body}
               }    
            },
           invalidatesTags:['user'] 
        }),
        chanMess:build.mutation<IData[],Query3>({
          query:(obj):IRes<IBody1>=>{
           const {id1,id2,...body}:Query3 = obj;
              return {
                url:`dialog/${id1}`,
                method:'PUT',
                body: {id:id2,...body}
                 }    
              },
            invalidatesTags:['user'] 
          }),
        delMess:build.mutation<IData[],Query4>({
          query:(obj):IRes<IBody1>=>{
           const {id1,id2,...body}:Query4 = obj;
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