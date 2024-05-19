import { ImploySocket } from "../types/types";

class Socket implements ImploySocket {
  
  current:number;
  users:number[];

  constructor(){
    this.current = -1;
    this.users = [];
  }
    
  addUser(id:number):void{
    this.current = id;
    const array:number[] = [...this.users,id]; 
    const set:ReadonlySet<number> = new Set(array);
    this.users = Array.from(set);
  }
      
  delUser():void{
    const {users,current}:ImploySocket = this;
    const newUsers:number[] = users
    .filter((i:number)=>i!==current);
    this.users = newUsers;
  }
}

export default Socket