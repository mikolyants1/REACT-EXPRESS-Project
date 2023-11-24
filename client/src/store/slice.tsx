import {createSlice,Slice,PayloadAction,CaseReducerActions,
ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { bind } from './store'

export interface Redux{
    current:string,
    theme:string
}
export type Pay = PayloadAction<string>
export type actions = CaseReducerActions<{
    setTheme:ActionCreatorWithPayload<string,`messanger/setTheme`>,
    setId:ActionCreatorWithPayload<string,`messanger/setId`>,
},'messanger'>
const initialState:Redux = {
    current:'',
    theme:'white'
};

const slice:Slice<Redux,{
    setTheme:(state:Redux,action:Pay)=>void,
    setId:(state:Redux,action:Pay)=>void,
},'messanger'> = createSlice({
    name:'messanger',
    initialState,
    reducers:{
       setTheme:(state:Redux,action:Pay):void=>{
        state.theme = action.payload
       },
       setId:(state:Redux,action:Pay):void=>{
        state.current = action.payload
       }
    }
});
export const action:bind = slice.actions;
export default slice.reducer;