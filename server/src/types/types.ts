export interface IMess{
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }

 export interface IBody{
  id1:string,
  id2:string,
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
 export interface ISocket {
    id:number
  }
 export interface IHas {
    id:number,
    has:boolean,
    auth:string
  }
export interface ImploySocket {
  current:number,
  users:number[],
  addUser:(id:number)=>void,
  delUser:()=>void
}

export interface ImployEmit {
   evt:string,
   test:(data:string)=>void
}
  export type Auth = {
    id:number
  }
  export type Type<T> = undefined|T

  export type Str<T> = T|string;

  export type Null<T> = T|null;