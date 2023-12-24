import express, { Request,Response,Express } from 'express'
import cors from 'cors'
import UserRouter from './routers/UserRouter.js'
import DialogRouter from './routers/DialogRouter.js'
import PassRouter from './routers/PassRouter.js'
import { createServer } from 'http'
import { Server }  from 'socket.io'
import Socket from './classes/socket.js'
import { union } from './types.js'
export const Base:string = 'users.json';

const PORT:union = process.env.PORT || 5000 ;
const app:Express = express() ;
app.use(express.json()) ;
app.use(cors());

app.get('/error',(_:Request,res:Response):void=>{
  res.sendStatus(404);
});

app.use('/dialog',DialogRouter);

app.use('/user',UserRouter);

app.use("/pass",PassRouter);

app.use((_:Request,res:Response):void=>{
  res.redirect("/error")
})
const server = createServer(app);

const io = new Server(server,{cors:{origin:"*"}});

const socketIo = new Socket();

io.on("connection",(socket):void=>{
  socket.on("join",(id:number):void=>{
     socketIo.addUser(id);
     socket.emit("online",socketIo.users);
   });

  socket.on("disconnect",():void=>{
     socketIo.delUser();
     socket.emit("online",socketIo.users);
   });

 });

server.listen(PORT,():void=>{
 console.log(`server works ,PORT ${PORT}`)
})

export default app