import express, { Request,Response,Express } from 'express'
import cors from 'cors'
import UserRouter from './UserRouter.js'
import DialogRouter from './DialogRouter.js'
export type Type<T> = undefined|T
export const Base:string = 'users.json'
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
  
app.listen(PORT,():void=>{
 console.log(`server works ,PORT ${PORT}`)
})