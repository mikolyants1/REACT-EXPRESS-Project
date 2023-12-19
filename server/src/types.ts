export interface mess{
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }

 export interface body{
  id1:string,
  id2:string,
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
 export interface socket {
    id:number
  }
 export interface has {
    id:number,
    has:boolean
  }
  export type Type<T> = undefined|T

  export type union = string|number