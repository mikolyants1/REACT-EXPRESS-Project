import { createSlice } from '@reduxjs/toolkit'
import { IRedux, TPay, TSlice } from '../../../libs/types';

const initialState:IRedux = {
    current:0,
    theme:'white',
    lang:"en",
    pass:"",
    authToken:""
};

export const messSlice:TSlice = createSlice({
  name:'messanger',
  initialState,
  reducers:{
    setTheme:(state:IRedux,action:TPay<string>) => {
      state.theme = action.payload;
    },
    setId:(state:IRedux,action:TPay<number>) => {
      state.current = action.payload;
    },
    setLang:(state:IRedux,action:TPay<string>) => {
      state.lang = action.payload;
    },
    setPass:(state:IRedux,action:TPay<string>) => {
      state.pass = action.payload;
    },
    setAuthToken:(state:IRedux,action:TPay<string>) => {
      state.authToken = action.payload;
    }
  }
});