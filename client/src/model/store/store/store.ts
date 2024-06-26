import storage from 'redux-persist/lib/storage'
import {Persistor, WebStorage, persistReducer,
persistStore } from 'redux-persist'
import {combineReducers,configureStore,bindActionCreators,
CaseReducerActions,
Dispatch} from '@reduxjs/toolkit'
import {useDispatch,useSelector,TypedUseSelectorHook} from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"
import { IRedux, IStoreState, TPay } from "../../../libs/types";
import { MessangerApi } from "../api/MessangerApi";
import { messSlice } from '../slices/slice'

interface IStore {
    key:string,
    storage:WebStorage,
    whitelist:string[],
    blacklist:string[]
}

const config:IStore = {
    key:'message',
    storage,
    whitelist:["messanger"],
    blacklist:["MessangerApi"]
}

const combine = combineReducers({
    mess:messSlice.reducer,
    [MessangerApi.reducerPath]:MessangerApi.reducer
});

const persist = persistReducer(config,combine);

export const store:ToolkitStore = configureStore({
    reducer:persist,
    middleware:(get:CurriedGetDefaultMiddleware)=>
    get().concat([MessangerApi.middleware])
}) ;

export type IBind = CaseReducerActions<{
  setTheme:(state:IRedux,action:TPay<string>)=>void,
  setId:(state:IRedux,action:TPay<number>)=>void,
  setLang:(state:IRedux,action:TPay<string>)=>void,
  setPass:(state:IRedux,action:TPay<string>)=>void,
  setAuthToken:(state:IRedux,actopn:TPay<string>)=>void
},"messanger">;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getTheme = ({mess}:IStoreState) => mess.theme;

export const getCurrent = ({mess}:IStoreState) => mess.current;

export const getLang = ({mess}:IStoreState) => mess.lang;

export const getPass = ({mess}:IStoreState) => mess.pass;

export const getToken = ({mess}:IStoreState) => mess.authToken;

setupListeners(store.dispatch);

export const useAction = ():IBind => {
   const dispacth:Dispatch = useAppDispatch();
   return bindActionCreators(messSlice.actions,dispacth);
}

export const catchedStore:Persistor = persistStore(store);