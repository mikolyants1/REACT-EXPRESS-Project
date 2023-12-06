import express, { Request,Response,Express } from 'express'
import cors from 'cors'
import UserRouter from './routers/UserRouter.js'
import DialogRouter from './routers/DialogRouter.js'
import io from './socket.js';
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

app.use((req:Request,res:Response):void=>{
  res.redirect('/error')
})

io.listen(5001);

app.listen(PORT,():void=>{
 console.log(`server works ,PORT ${PORT}`)
})
export default app