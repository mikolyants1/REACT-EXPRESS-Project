import {createSlice,Slice,PayloadAction,CaseReducerActions,
ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { bind } from './store'

export interface Redux{
    current:string,
    theme:string,
    lang:string
}
export type Pay = PayloadAction<string>
export type actions = CaseReducerActions<{
    setTheme:ActionCreatorWithPayload<string,`messanger/setTheme`>,
    setId:ActionCreatorWithPayload<string,`messanger/setId`>,
    setLang:ActionCreatorWithPayload<string,`messanger/setLang`>
},'messanger'>
const initialState:Redux = {
    current:'',
    theme:'white',
    lang:"en"
};

const slice:Slice<Redux,{
    setTheme:(state:Redux,action:Pay)=>void,
    setId:(state:Redux,action:Pay)=>void,
    setLang:(state:Redux,actopn:Pay)=>void
},'messanger'> = createSlice({
    name:'messanger',
    initialState,
    reducers:{
       setTheme:(state:Redux,action:Pay):void=>{
        state.theme = action.payload
       },
       setId:(state:Redux,action:Pay):void=>{
        state.current = action.payload
       },
       setLang:(state:Redux,action:Pay):void=>{
         state.lang = action.payload
       }
    }
});
export const action:bind = slice.actions;
export default slice.reducer;