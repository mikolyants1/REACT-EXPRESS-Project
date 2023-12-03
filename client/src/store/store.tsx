import slice,{Pay,action,Redux} from "./slices/slice";
import storage from 'redux-persist/lib/storage'
import {Persistor, WebStorage, persistReducer,
persistStore } from 'redux-persist'
import {combineReducers,configureStore,bindActionCreators,
CaseReducerActions} from '@reduxjs/toolkit'
import {useDispatch,useSelector,TypedUseSelectorHook} from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import MessApi from "./api/Api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"

 interface state {
    mess:Redux
  }
interface store {
    key:string,
    storage:WebStorage
}
const config:store={
    key:'message',
    storage
}
const combine = combineReducers({
    mess:slice,
    [MessApi.reducerPath]:MessApi.reducer
});
const persist = persistReducer(config,combine);

export const store:ToolkitStore = configureStore({
    reducer:persist,
    middleware:(getDefaultMiddleware:CurriedGetDefaultMiddleware)=>
    getDefaultMiddleware().concat(MessApi.middleware)
}) ;

export type bind=CaseReducerActions<{
    setTheme:(state:Redux,action:Pay<string>)=>void,
    setId:(state:Redux,action:Pay<number>)=>void,
    setLang:(state:Redux,action:Pay<string>)=>void
},"messanger">;

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getTheme=({mess}:state)=>mess.theme;

export const getCurrent=({mess}:state)=>mess.current;

export const getLang=({mess}:state)=>mess.lang;

setupListeners(store.dispatch);

export const useAction=():bind=>bindActionCreators(action,useAppDispatch());

export const catched:Persistor=persistStore(store);