import { Server } from "http";
import { ImploySocket } from "../types/types";
import { Server as IoServer } from "socket.io";

export class Socket implements ImploySocket {
  private readonly server:IoServer;
  current:number;
  users:number[];

  constructor(server:Server){
    this.server = new IoServer(server,{cors:{origin:"*"}});
    this.current = -1;
    this.users = [];
  }
    
  start():void {
    this.server.on("connection",(socket) => {
      socket.on("join",(id:number) => {
        this.addUser(id);
        socket.emit("online",this.users);
      });
    
      socket.on("disconnect",() => {
        this.delUser();
        socket.emit("online",this.users);
      });
    });
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
    .filter((i:number)=>i! == current);
    this.users = newUsers;
  }
}