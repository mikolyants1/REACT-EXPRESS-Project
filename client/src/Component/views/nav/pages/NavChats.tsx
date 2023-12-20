import { BlockInput, ContactInput, ContactTime} from "../../../../style/style.js"
import { useCallback, useContext, useEffect, useReducer, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Context, EvtC, EvtK, Null, Type,act,chatProps,
data, message, st, } from "../../../../types/type.js"
import ProfileCard from "../../../ui/cards/navcards/ProfileCard.js"
import {io,Socket} from 'socket.io-client';
import { defaultState1,reduce } from "../../../helpers/Reducer.js"
import Theme from "../../../helpers/Context.js"
import Loader from "../../../ui/blocks/Loader.js"
import Error from "../../../ui/blocks/Error.js"

export default function NavChats({set,id,call,caller}:chatProps):JSX.Element{
    const {user,val,translate} = useContext<Context>(Theme);
    if (!translate) return <Error back={val} />;
    const [data,setData] = useState<Type<data>>(null!);
    const [idx,setIdx] = useState<Null<number>>(call??null);
    const [text,setText] = useState<string>('');
    const [socket,setSocket] = useState<Socket>(null!);
    const [online,setOnline] = useState<number[]>();
    const [state,dispatch] = useReducer(reduce<st,act>,defaultState1);
      const change=(e:EvtC):void=>{
        setText(e.target.value);
      };
      const toggle=useCallback((i:number):void=>{
        caller(i);
        set({type:1});
      },[]);
     const setIndex=useCallback((i:number):void=>setIdx(i),[])
     
     const sort=(e:EvtK):void=>{
      if (e.key==='Enter'&&Array.isArray(state.base)){
      const val:string = text.trim().toLocaleLowerCase()
      const newData:data[] = state.base.filter((i:data):Type<data>=>{
       if (i.name.toLocaleLowerCase().indexOf(val)!==-1) return i;
       });
       dispatch({data:newData});
      };
     };
     const getUser=(arg:number):Type<message>=>{
      if (!data||!Array.isArray(state.data)) return undefined;
      const {id,message}:data = state.data.find((i:data)=>i.id==arg);
      const item1:Type<message> = data.message.find((i:message)=>i.id==id);
      const item2:Type<message> = message.find((i:message)=>i.id==data.id);
      return item1||item2;
     }
      useEffect(():void=>{
       setSocket(io("http://localhost:5000"));
       async function Prom():Promise<void>{
        return await axios.get('http://localhost:5000/user')
        .then(({data}:AxiosResponse<data[]>):void=>{
        if (Array.isArray(data)){
          const date:Type<data> = data.find((i:data)=>i.id==user);
          dispatch({data:data,base:data});
          setData(date);
          }
        })
        .catch(()=>dispatch({err:true}))
        .finally(()=>dispatch({load:false}))
       };
       Prom();
      },[]);

      useEffect(():void=>{
        socket?.emit("join",user);
        socket?.on("online",(users:number[]):void=>{
          setOnline(users);
        });
      },[socket])

  if (state.load) return <Loader back={val} />;
  if (state.err) return <Error back={val} />;
    return (
        <>
        <BlockInput>
          <ContactInput
           back={val}
           type="text"
           onChange={change}
           onKeyUp={sort}
           placeholder={translate('search')}
            />
        </BlockInput>
         <>
          {!id&&(
            <ProfileCard
             path={user}
             fill={`${idx==user}`}
             click={()=>setIndex(user)}
             name={translate("Main")}
            />
           )}
         </>
        {Array.isArray(state.data)&&state.data.map(
        ({name,id:userId}:data):Null<JSX.Element>=>{
        if (id) {
        const isOnline:Type<number> = online?.find((i:number)=>i==userId);
        return userId!==user ? (   
            <ProfileCard click={()=>toggle(userId)}
             name={name} path={userId} key={userId}
             logo={name.slice(0,1).toUpperCase()}>
              <ContactTime online={`${isOnline}`}>
                {isOnline ? "online" : "offline"}
              </ContactTime>
            </ProfileCard>
          ) : null
         } else {
           const show:Type<message> = getUser(userId);
            return show&&(userId!==user) ? (
              <ProfileCard
               key={userId}
               path={userId}
               fill={`${idx==userId}`}
               click={()=>setIndex(userId)}
               logo={name.slice(0,1).toUpperCase()}
               name={name}
                />
             ) : null
         }})}
        </>
    )
}