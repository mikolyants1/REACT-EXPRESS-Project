import {ChangeEvent,KeyboardEvent,Dispatch,SetStateAction} from 'react'
import {TFunction} from 'i18next'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export type Type<T> = undefined|T
export type Str<T> = string|T
export type Null<T> = null|T
export type EvtC = ChangeEvent<HTMLInputElement>
export type EvtK = KeyboardEvent<HTMLInputElement>
export type union = ActionCreatorWithPayload<string,`messanger/${string}`>

export interface stateUser {
    name:string,
    pass:string,
   }
export interface mess{
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }
 export interface query1{
    id:number,
    name:string,
    pass:string,
  }
 export interface query2{
    id1:number,
    id2:number,
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }
 export interface user{
   name:string,
   pass:string,
  }
  export interface message{
    id:number,
    mess:mess[]
  }
  export interface data{
    id:number,
    name:string,
    pass:string,
    message:message[]
  }
 export interface body{
    text:string,
    date:string,
    now:number,
    day:number,
    month:string,
    id:number
  }
  export interface body1{
    text?:string,
    id:number,
    now:number
  }
 export interface res<T> {
    url:string,
    method:string,
    body?:T
  }
export interface mess{
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}
export interface newMess{
  id:number,
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}
export interface message{
  id:number,
  mess:mess[]
}
export interface data{
  id:number,
  name:string,
  pass:string,
  message:message[]
}
export interface outlet{
  val:string,
  user:number,
  lang:string,
  translate:TFunction<"translation",string>,
  show:Dispatch<SetStateAction<boolean>>
}
export interface Context{
    val:string,
    user:number,
    translate:Null<TFunction<"translation",string>>,
    hide:()=>void
  };
  export interface st{
    data:unknown,
    base:unknown,
    err:boolean,
    load:boolean
  }
 export interface st1{
    now:number,
    text:string,
    status:boolean
 }

 export interface error {
   type:string,
   name:string,
   message:string
 }

 export type StArr = [string,boolean]

 export type st2 = Record<string,boolean>

 export type act1 = Record<string,string|boolean|number>

 export type act = Record<string,unknown|boolean>

 export type query3 = Omit<query2,"day"|"date"|"month">

 export type query4 = Omit<query3,"text">

 export interface action2{
    type:number
  }
  export interface query<T>{
    data:T,
    isError:boolean,
    isLoading:boolean
  }
  export interface chatProps{
    set:Dispatch<action2>,
    id:boolean,
    call:Null<number>,
    caller:Dispatch<SetStateAction<Null<number>>>
  }
  export interface SettProps{
    set:Dispatch<action2>,
    call:Dispatch<SetStateAction<Null<number>>>
  }
  