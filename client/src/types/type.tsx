import {ChangeEvent,KeyboardEvent,Dispatch,SetStateAction} from 'react'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'

export type Type<T> = undefined|T
export type Str<T> = string|T
export type Null<T> = null|T
export type EvtC = ChangeEvent<HTMLInputElement>
export type EvtK = KeyboardEvent<HTMLInputElement>
export type union = string|null|ArrayBuffer

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
    phone:string,
  }
 export interface query2{
    id1:string,
    id2:string,
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }
 export interface user{
   name:string,
   phone:string,
  }
  export interface message{
    id:number,
    mess:mess[]
  }
  export interface data{
    id:number,
    name:string,
    phone:string,
    message:message[]
  }
 export interface body{
    text:string,
    date:string,
    now:number,
    day:number,
    month:string,
    id:string
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
  phone:string,
  message:message[]
}
export interface outlet{
  val:string,
  user:string,
  show:Dispatch<SetStateAction<boolean>>,
  set:ActionCreatorWithPayload<string,`messanger/setTheme`>
}
export interface Context{
    val:string,
    set:ActionCreatorWithPayload<string,`messanger/setTheme`>|string,
    user:string,
    hide:()=>void
  };
  export interface state{
    data:any,
    err:boolean,
    load:boolean
  }
 export type action1 = Record<string,any|boolean>

 export interface action2{
    type:number
  }
  
  export interface chatProps{
    set:Dispatch<action2>,
    id:boolean,
    call:Null<number>,
    caller:Dispatch<SetStateAction<Null<number>>>
  }
  export interface SettProps{
    set:Dispatch<action1>,
    call:Dispatch<SetStateAction<Null<number>>>
  }
  