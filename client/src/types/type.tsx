import {ChangeEvent,KeyboardEvent,Dispatch,SetStateAction, LazyExoticComponent, ComponentType} from 'react'
import {TFunction} from 'i18next'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ControllerRenderProps, FieldValues, SubmitHandler } from 'react-hook-form'
import { BaseQueryApi } from '@reduxjs/toolkit/query'

export type Type<T> = undefined|T;

export type Str<T> = string|T;

export type Null<T> = null|T;
export type EvtC = ChangeEvent<HTMLInputElement>;

export type EvtK = KeyboardEvent<HTMLInputElement>;

export type union = ActionCreatorWithPayload<string,`messanger/${string}`>;

export interface ICheck {
  isValid:boolean
}

export interface IStateUser {
  name:string,
  pass:string
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
  set:union,
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
  val:string,
  user:number,
  lang:string,
  translate:TFunction<"translation",string>,
  show:Dispatch<SetStateAction<boolean>>
}

export interface IUserContext {
  change:(e:EvtC)=>void,
  click:(E:EvtK)=>void
}

export interface IContext{
    val:string,
    user:number,
    translate:Null<TFunction<"translation",string>>,
    hide:()=>void
  }

  export interface ISt{
    data:unknown,
    base:unknown,
    err:boolean,
    load:boolean
  }

 export interface ISt1{
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
 
 export type StArr = [string,boolean]

 export type St2 = Record<string,boolean>

 export type Act1 = Record<string,ISt1[keyof ISt1]>

 export type Act = Record<string,ISt[keyof ISt]>

 export type Query3 = Omit<IQuery2,"day"|"date"|"month">

 export type Query4 = Omit<Query3,"text">

export type Control<T extends 'pass'|'name'> = ControllerRenderProps<FieldValues,T>;

export type Lazy<T> = LazyExoticComponent<ComponentType<T>>;

export type Sub<T extends FieldValues> = SubmitHandler<T>;

export interface ISubProps {
    name:string,
    pass:string,
    regist:boolean
}

export interface InputProps {
  title:string,
  Name:'pass'|'name'
}
 export interface IAction2{
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

  export type IApi = Pick<BaseQueryApi,'getState'>
  export interface chatProps{
    set:Dispatch<IAction2>,
    id:boolean,
    call:Null<number>,
    caller:Dispatch<SetStateAction<Null<number>>>
  }
  export interface ISettProps{
    set:Dispatch<IAction2>,
    call:Dispatch<SetStateAction<Null<number>>>
  }
  