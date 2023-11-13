import { ContactBlock, ContactInput, ContactLogo,
ContactName, ContactText, ContactTime, styleObj,
 avatar, 
 BlockInput} from "../style/style.js"
import { useContext, useEffect, useReducer, useState,
 Dispatch,SetStateAction } from "react"
import axios, { AxiosResponse } from "axios"
import { Link} from "react-router-dom"
import { Context, Theme } from "./Page.js"
import { EvtC, EvtK, Null, Type, data, message } from "./Main.js"
import { Loader, Error } from "./Loader.js"

interface props{
  set:Dispatch<{type:number}>,
  id:boolean,
  call:Null<number>,
  caller:Dispatch<SetStateAction<Null<number>>>
}
interface state{
  data:any,
  err:boolean,
  load:boolean
}
type action = Record<string,any|boolean>

export function NavChats({set,id,call,caller}:props):JSX.Element{
    const {user,val,hide} = useContext<Context>(Theme)
    const [data,setData] = useState<Type<data>>(null!)
    const [idx,setIdx] = useState<Null<number>>(call?call:null)
    const [text,setText] = useState<string>('')
    const [state,dispatch] = useReducer(
    (prev:state,next:action)=>({...prev,...next}),
    {data:null,err:false,load:true}
      )
      const change=(e:EvtC):void=>{
        setText(e.target.value)
      }
      const toggle=(i:number):void=>{
        caller(i)
        set({type:1})
      }
     const sort=(e:EvtK):void=>{
        if (e.key==='Enter'){
      const val:string = text.trim().toLocaleLowerCase()
      const newData:data[] = state.data.filter((i:data):Type<data>=>{
        if (i.name.toLocaleLowerCase().indexOf(val)!==-1){
               return i
           }
        })
        dispatch({data:newData})
      }
     }
     const getUser=(arg:string):Type<message>=>{
      if (!data) return undefined
      const {id,message}:data = state.data.find((i:data)=>i.phone==arg)
      const item1:Type<message> = data.message.find((i:message)=>i.id==id)
      const item2:Type<message> = message.find((i:message)=>i.id==data.id)
      return item1||item2
     }
      useEffect(():void=>{
       async function Prom():Promise<void>{
        return await axios.get('http://localhost:5000/user')
        .then(({data}:AxiosResponse<data[]>):void=>{
          const date:Type<data> = data.find((i:data)=>i.phone==user)
          dispatch({data:data})
          setData(date)
        })
        .catch(()=>dispatch({err:true}))
        .finally(()=>dispatch({load:false}))
       }
       Prom()
      },[])
  if (state.load) return <Loader back={val} />
  if (state.err) return <Error back={val} />
    return (
        <>
        <BlockInput>
        <ContactInput
         back={val}
         type="text"
         onChange={change}
         onKeyUp={sort}
         placeholder="search"
         />
         </BlockInput>
         <>
          {!id ? (
          <Link to={`/page/main/${user}`} onClick={hide}>
            <ContactBlock fill={`${idx==-1}`}
             back={val} onClick={()=>setIdx(-1)}>
              <ContactLogo left='rgb(56, 231, 120)'
               right='rgb(177, 248, 177)'>
                 &#9733;
              </ContactLogo>
              <ContactText>
                <ContactName>
                    Main
                </ContactName>
              </ContactText>
            </ContactBlock>
          </Link>
          ) : null
        }
         </>
        {state.data.map(({name,phone}:data,i:number):Null<JSX.Element>=>{
        const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)]
        const exclude:boolean = phone == user
         if (id) {
        return !exclude ? (
          <Link to={`/page/main/${phone}`}
           key={phone} onClick={hide}>
            <ContactBlock back={val} 
             onClick={()=>toggle(i)}>
              <ContactLogo left={one} right={two}>
                {name.slice(0,1).toUpperCase()}
              </ContactLogo>
              <ContactText>
                <ContactName>
                    {name}
                </ContactName>
                <ContactTime>
                   offline
                </ContactTime>
              </ContactText>
            </ContactBlock>
          </Link>
          ) : null
         } else {
           const show:Type<message> = getUser(phone)
            return show&&!exclude ? (
                <Link to={`/page/main/${phone}`}
                 key={phone} onClick={hide}>
                <ContactBlock back={val} fill={`${i==idx}`}
                 onClick={()=>setIdx(i)}>
                  <ContactLogo left={one} right={two}>
                    {name.slice(0,1).toUpperCase()}
                  </ContactLogo>
                  <ContactText>
                    <ContactName>
                        {name}
                    </ContactName>
                  </ContactText>
                </ContactBlock>
              </Link>
             ) : null
         }})}
        </>
    )
}