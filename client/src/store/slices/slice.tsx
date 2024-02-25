import {createSlice,Slice,PayloadAction,CaseReducerActions,
ActionCreatorWithPayload,} from '@reduxjs/toolkit'
import { bind } from '../store/store'

export interface Redux{
    current:number,
    theme:string,
    lang:string,
    pass:string,
    authToken:string
}
export type Pay<T> = PayloadAction<T>;

export type actions = CaseReducerActions<{
  setTheme:ActionCreatorWithPayload<string,`messanger/setTheme`>,
  setId:ActionCreatorWithPayload<string,`messanger/setId`>,
  setLang:ActionCreatorWithPayload<string,`messanger/setLang`>,
  setPass:ActionCreatorWithPayload<string,"messanger/setPass">,
  setAuthToken:ActionCreatorWithPayload<string,"messanger/setAuthToken">
},'messanger'>

const initialState:Redux = {
    current:0,
    theme:'white',
    lang:"en",
    pass:"",
    authToken:""
};

const slice:Slice<Redux,{
    setTheme:(state:Redux,action:Pay<string>)=>void,
    setId:(state:Redux,action:Pay<number>)=>void,
    setLang:(state:Redux,actopn:Pay<string>)=>void,
    setPass:(state:Redux,actopn:Pay<string>)=>void,
    setAuthToken:(state:Redux,actopn:Pay<string>)=>void
},'messanger'> = createSlice({
    name:'messanger',
    initialState,
    reducers:{
       setTheme:(state:Redux,action:Pay<string>):void=>{
        state.theme = action.payload;
       },
       setId:(state:Redux,action:Pay<number>):void=>{
        state.current = action.payload;
       },
       setLang:(state:Redux,action:Pay<string>):void=>{
         state.lang = action.payload;
       },
       setPass:(state:Redux,action:Pay<string>):void=>{
        state.pass = action.payload;
      },
      setAuthToken:(state:Redux,action:Pay<string>):void=>{
        state.authToken = action.payload;
      }
    }
});
export const action:bind = slice.actions;
export default slice.reducer;