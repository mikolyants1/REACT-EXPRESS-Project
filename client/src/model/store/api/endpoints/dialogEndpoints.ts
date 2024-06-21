import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { DialogApi } from "../dialog/dialogApi";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { IBody, IBody1, IData, IQuery2, IRes, TQuery3, TQuery4 } from "../../../../libs/types/type";

// eslint-disable-next-line react-refresh/only-export-components
const DialogEndpoints = DialogApi.injectEndpoints({
    endpoints:(build:EndpointBuilder<BaseQueryFn,string,string>)=>({
      setMess:build.mutation<IData[],IQuery2>({
        query:(obj):IRes<IBody>=>{
          const {id1,id2,...body}:IQuery2 = obj;
          return {
            url:`/${id1}`,
            method:'POST',
            body: {id:id2,...body}
          }    
        },
        invalidatesTags:["user"]
      }),
      chanMess:build.mutation<IData[],TQuery3>({
        query:(obj):IRes<IBody1>=>{
          const {id1,id2,...body}:TQuery3 = obj;
          return {
            url:`/${id1}`,
            method:'PUT',
            body: {id:id2,...body}
          }    
        },
        invalidatesTags:['user'] 
      }),
      delMess:build.mutation<IData[],TQuery4>({
        query:(obj):IRes<IBody1>=>{
          const {id1,id2,...body}:TQuery4 = obj;
          return {
            url:`/${id1}`,
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