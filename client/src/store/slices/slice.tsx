import {createSlice,Slice,PayloadAction,CaseReducerActions,
ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { bind } from '../store'

export interface Redux{
    current:number,
    theme:string,
    lang:string,
    pass:string
}
export type Pay<T> = PayloadAction<T>
export type actions = CaseReducerActions<{
  setTheme:ActionCreatorWithPayload<string,`messanger/setTheme`>,
  setId:ActionCreatorWithPayload<string,`messanger/setId`>,
  setLang:ActionCreatorWithPayload<string,`messanger/setLang`>
},'messanger'>

const initialState:Redux = {
    current:0,
    theme:'white',
    lang:"en",
    pass:""
};

const slice:Slice<Redux,{
    setTheme:(state:Redux,action:Pay<string>)=>void,
    setId:(state:Redux,action:Pay<number>)=>void,
    setLang:(state:Redux,actopn:Pay<string>)=>void,
    setPass:(state:Redux,actopn:Pay<string>)=>void
},'messanger'> = createSlice({
    name:'messanger',
    initialState,
    reducers:{
       setTheme:(state:Redux,action:Pay<string>):void=>{
        state.theme = action.payload
       },
       setId:(state:Redux,action:Pay<number>):void=>{
        state.current = action.payload
       },
       setLang:(state:Redux,action:Pay<string>):void=>{
         state.lang = action.payload
       },
       setPass:(state:Redux,action:Pay<string>):void=>{
        state.pass = action.payload
      }
    }
});
export const action:bind = slice.actions;
export default slice.reducer;