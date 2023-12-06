import { Server } from 'socket.io'

const io = new Server({
  cors:{
    origin:"*"
  }
})

let users:number[] = [];
let current:number = -1;

function addUser(id:number):void{
  users = Array.from(new Set([...users,id]));
}

function delUser(id:number):void{
  users = users.filter((i:number)=>i!==id);
}

io.on("connection",(socket):void=>{
  socket.on("join",(id:number):void=>{
     current = id;
     addUser(id);
     socket.emit("online",users);
   });

  socket.on("disconnect",():void=>{
     delUser(current);
     socket.emit("online",users);
   });

 });

 export default io