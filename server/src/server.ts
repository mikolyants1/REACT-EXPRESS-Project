import express, { Request,Response,Express } from 'express'
import cors from 'cors'
import UserRouter from './routers/UserRouter.js'
import DialogRouter from './routers/DialogRouter.js'
import { createServer } from 'http'
import { Server }  from 'socket.io'
export const Base:string = 'users.json';

const PORT:string|number = process.env.PORT || 5000
const app:Express = express()
app.use(express.json())
app.use(cors())

app.get('/error',(req:Request,res:Response):void=>{
    res.sendStatus(404)
})
app.use('/dialog',DialogRouter)

app.use('/user',UserRouter)

const server = createServer(app);

const io = new Server(server,{cors:{origin:"*"}});

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
server.listen(PORT,():void=>{
 console.log(`server works ,PORT ${PORT}`)
})

export default app