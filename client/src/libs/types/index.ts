import {ChangeEvent,KeyboardEvent,Dispatch,SetStateAction, LazyExoticComponent, ComponentType} from 'react'
import {TFunction} from 'i18next'
import { ActionCreatorWithPayload, CaseReducerActions, PayloadAction, Slice } from '@reduxjs/toolkit'
import { ControllerRenderProps, FieldValues, SubmitHandler } from 'react-hook-form'
import { BaseQueryApi } from '@reduxjs/toolkit/query'

export type Type<T> = undefined|T
export type TStr<T> = string|T
export type TNull<T> = null|T
export type TEvtC = ChangeEvent<HTMLInputElement>
export type TEvtK = KeyboardEvent<HTMLInputElement>
export type TUnion = ActionCreatorWithPayload<string,`messanger/${string}`>

export interface ICheck {
   isValid:boolean
}

export type TSlice = Slice<IRedux,{
  setTheme:(state:IRedux,action:TPay<string>)=>void,
  setId:(state:IRedux,action:TPay<number>)=>void,
  setLang:(state:IRedux,actopn:TPay<string>)=>void,
  setPass:(state:IRedux,actopn:TPay<string>)=>void,
  setAuthToken:(state:IRedux,actopn:TPay<string>)=>void
},'messanger'>;

export interface IStateUser {
    name:string,
    pass:string,
}

export interface ISets {
  val:string,
  name:string
 }

 export interface ITime {
  date:string,
  day:number,
  month:string
 }

export interface IThemes {
  set:TUnion,
  back:string,
  name:string
}
 export interface IQuery1{
    id:number,
    name:string,
    pass:string,
 }
 export interface IQuery2{
    id1:number,
    id2:number,
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }
 export interface IUser{
   name:string,
   pass:string,
  }
  export interface IMessage{
    id:number,
    mess:IMess[]
  }
 export interface IBody{
    text:string,
    date:string,
    now:number,
    day:number,
    month:string,
    id:number
  }
  export interface IBody1{
    text?:string,
    id:number,
    now:number
  }
 export interface IRes<T> {
  url:string,
  method:string,
  body?:T
 }

export interface IMess{
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}
export interface INewMess{
  id:number,
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}

export interface IStyleObj{
  one:string,
  two:string
}

export interface IMessage{
  id:number,
  mess:IMess[]
}

export interface IData{
  id:number,
  name:string,
  pass:string,
  message:IMessage[]
}

export interface IOutlet{
  theme:string,
  user:number,
  lang:string,
  translate:TFunction<"translation",string>,
  show:Dispatch<SetStateAction<boolean>>
}

export interface IUserContext {
  change:(e:TEvtC)=>void,
  click:(E:TEvtK)=>void
}

export interface IContext {
    theme:string,
    user:number,
    translate:TNull<TFunction<"translation",string>>,
    hide:()=>void
  }

  export interface IChatState{
    data:unknown,
    base:unknown,
    err:boolean,
    load:boolean
  }

 export interface IHomeState{
    now:number,
    text:string,
    status:boolean
 }

 export interface IError {
   type:string,
   name:string,
   message:string
 }

 export interface IToken {
  token:string
 }
 
 export type TNavStateArr = [string,boolean]

 export type TNavState = Record<string,boolean>

 export type THomeAction = Record<string,IHomeState[keyof IHomeState]>

 export type TChatAction = Record<string,IChatState[keyof IChatState]>

 export type TQuery3 = Omit<IQuery2,"day"|"date"|"month">

 export type TQuery4 = Omit<TQuery3,"text">

export type TControl<T extends 'pass'|'name'> = ControllerRenderProps<FieldValues,T>;

export type TLazy<T> = LazyExoticComponent<ComponentType<T>>;

export type TSub<T extends FieldValues> = SubmitHandler<T>;

export interface ISubProps {
    name:string,
    pass:string,
    regist:boolean
}

export interface InputProps {
  title:string,
  name:'pass'|'name'
}

export interface INavAction{
  type:number
}

export interface IQuery<T>{
  data:T,
  isError:boolean,
  isLoading:boolean
}

export interface IHas {
  id:number,
  has:boolean,
  auth:string
}

export interface ILoad {
  back:string
}

export type TStoreActions = CaseReducerActions<{
  setTheme:ActionCreatorWithPayload<string,`messanger/setTheme`>,
  setId:ActionCreatorWithPayload<string,`messanger/setId`>,
  setLang:ActionCreatorWithPayload<string,`messanger/setLang`>,
  setPass:ActionCreatorWithPayload<string,"messanger/setPass">,
  setAuthToken:ActionCreatorWithPayload<string,"messanger/setAuthToken">
},'messanger'>

export type TApi = Pick<BaseQueryApi,'getState'>;

export interface IStoreState {
  mess:IRedux
}

export type TGetState = ({mess}:IStoreState)=>IRedux;

export interface IRedux {
  current:number,
  theme:string,
  lang:string,
  pass:string,
  authToken:string
}
export type TPay<T> = PayloadAction<T>;


export interface IChatProps{
  set:Dispatch<INavAction>,
  id:boolean,
  call:TNull<number>,
  caller:Dispatch<SetStateAction<TNull<number>>>
}

export interface ISettProps{
  set:Dispatch<INavAction>,
  call:Dispatch<SetStateAction<TNull<number>>>
}
  