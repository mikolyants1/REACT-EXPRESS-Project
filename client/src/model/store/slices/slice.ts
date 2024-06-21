import {createSlice,Slice} from '@reduxjs/toolkit'
import { IBind } from '../store/store'
import { IRedux, TPay } from '../../../libs/types';

const initialState:IRedux = {
    current:0,
    theme:'white',
    lang:"en",
    pass:"",
    authToken:""
};

const slice:Slice<IRedux,{
    setTheme:(state:IRedux,action:TPay<string>)=>void,
    setId:(state:IRedux,action:TPay<number>)=>void,
    setLang:(state:IRedux,actopn:TPay<string>)=>void,
    setPass:(state:IRedux,actopn:TPay<string>)=>void,
    setAuthToken:(state:IRedux,actopn:TPay<string>)=>void
},'messanger'> = createSlice({
    name:'messanger',
    initialState,
    reducers:{
      setTheme:(state:IRedux,action:TPay<string>):void=>{
        state.theme = action.payload;
      },
      setId:(state:IRedux,action:TPay<number>):void=>{
        state.current = action.payload;
      },
      setLang:(state:IRedux,action:TPay<string>):void=>{
        state.lang = action.payload;
      },
      setPass:(state:IRedux,action:TPay<string>):void=>{
        state.pass = action.payload;
      },
      setAuthToken:(state:IRedux,action:TPay<string>):void=>{
        state.authToken = action.payload;
      }
    }
});
export const action:IBind = slice.actions;
export default slice.reducer;