import { useState,useRef,Dispatch,SetStateAction,
ChangeEvent,KeyboardEvent} from 'react'
import { Container, FootBlock, HeaderBlock, Logo, MainBlock,
 MainInput,MessBlock,MessContent,MessDate,MessSpan,MessText,
 MessTime,Message,Name,Span,avatar, styleObj} from '../style/style.js'
import { Params, useOutletContext, useParams } from 'react-router-dom'
import { useGetUserQuery, useSetMessMutation } from '../store/Api.js'
import { query } from './Setting.js'
import { ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { Loader, Error } from './Loader.js'

export type Type<T> = undefined|T
export type Str<T> = string|T
export type Null<T> = null|T
export type EvtC = ChangeEvent<HTMLInputElement>
export type EvtK = KeyboardEvent<HTMLInputElement>

export interface mess{
  text:string,
  date:string,
  now:number,
  day:number,
  month:string
}
interface newMess{
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
interface props{
  children:JSX.Element
}

export default function Main({children}:props):JSX.Element {
 const {id}:Readonly<Params<string>> = useParams()
 const ref = useRef<HTMLInputElement>(null!)
 const {val,user} = useOutletContext<outlet>()
 const [text,setText] = useState<string>('')
 const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)]
 const [addMess] = useSetMessMutation()
 const result:query[] = [
  useGetUserQuery<query>(id),
  useGetUserQuery<query>(user),
  ]
 const getMessage=(d1:data,d2:data):newMess[]=>{
  const user1:Type<message> = d1.message.find((i:message)=>i.id==d2.id)
  const user2:Type<message> = d2.message.find((i:message)=>i.id==d1.id)
  const newUser1:Type<newMess[]> = user1?.mess.map((i:mess)=>({id:d2.id,...i}))
  const newUser2:Type<newMess[]> = user2?.mess.map((i:mess)=>({id:d2.id,...i}))
  const item1:newMess[] = typeof newUser1!=='undefined' ? newUser1 : []
  const item2:newMess[] = typeof newUser2!=='undefined' ? newUser2 : []
  const arr:newMess[] = d2.id==d1.id ? [...item1] : [...item1,...item2]
  return arr.sort((x:newMess,y:newMess)=>x.now-y.now)
  }
 const showTime=(arg:mess[],i:number):boolean=>{
  return arg[i].day!==arg[i-1].day
 }
 const change=(e:EvtC):void=>{
   setText(e.target.value)
 }
 const press=(e:EvtK):void=>{
   if (e.key==='Enter'&&typeof id!=='undefined'){
     const date:Date = new Date()
     const our:number = date.getHours()
     const min:number = date.getMinutes()
     const Our:string = our<10 ? `0${our}` : `${our}`
     const Min:string = min<10 ? `0${min}` : `${min}`
     addMess({
      id1:id,
      id2:user,
      text:text,
      date:`${Our}:${Min}`,
      now:Date.now(),
      day:date.getDate(),
      month:date.toLocaleString('default',{month:'long'})
     })
     ref.current.value=''
   }
 }
 if (result.some(({isLoading})=>isLoading)) return <Loader back={val} />
 if (result.some(({isError})=>isError)) return <Error back={val} />
 const [{data:d1},{data:d2}]:query[] = [...result]
 if (!d1||!d2) return <Error back={val} />
 const mess:newMess[] = getMessage(d1,d2)
 const isMine:boolean = d1.id == d2.id
 const color1:string = isMine ? 'rgb(56, 231, 120)' : one
 const color2:string = isMine ? 'rgb(177, 248, 177)' : two
   return (
        <Container back={val}>
          <HeaderBlock back={val}>
            <Logo start={color1} two={color2}>
              {!isMine&&<>{d1.name.slice(0,1).toUpperCase()}</>} 	
              {isMine&&<Span>&#9733;</Span>}
            </Logo>
            <Name>
             {isMine ? 'Main' : d1.name}
            </Name>
            {children}
          </HeaderBlock>
          <MainBlock>
            <Message>
            {mess.map((props:newMess,i:number):JSX.Element=>{
             const {id,text,date,day,month}:newMess = props
             const right:Null<boolean> = i==0 ? null : showTime(mess,i)
             return (
                <>
                  {right||i==0&&
                   <MessDate>
                     {day} {month}
                   </MessDate>
                  }
                  <MessBlock key={`${i}s`}
                   col={`${id!==d2.id}`}>
                    <MessContent back={val}
                     col={`${id!==d2.id}`}>
                      <MessText>
                        <MessSpan>
                          {text}
                        </MessSpan>
                      </MessText>
                      <MessTime>
                       {date}
                      </MessTime>
                    </MessContent>
                  </MessBlock>
                </>
                 )
               })}
            </Message>
          </MainBlock>
          <FootBlock>
            <MainInput 
             back={val}
             placeholder='your message'
             onChange={change}
             onKeyUp={press}
             ref={ref}
             />
          </FootBlock>
        </Container>
  )
}
