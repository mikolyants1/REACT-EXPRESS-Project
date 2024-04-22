import { BlockInput, ContactInput, ContactTime} from "../../../../style/style.js"
import { useCallback, useContext, useEffect, useReducer, useState} from "react"
import axios, { AxiosResponse } from "axios"
import { IContext, EvtC, Null, Type,Act,chatProps,IData, IMessage, ISt} from "../../../../types/type.js"
import ProfileCard from "../../../ui/cards/navcards/ProfileCard.js"
import {io,Socket} from 'socket.io-client';
import { defaultState1,reduce } from "../../../helpers/Reducer.js"
import Theme from "../../../helpers/Context.js"
import Loader from "../../../ui/blocks/load/Loader.js"
import Error from "../../../ui/blocks/load/Error.js"
import getUser from "../../../helpers/functions/main/GetUser.js"

export default function NavChats({set,id,call,caller}:chatProps):JSX.Element{
    const {user,val,translate} = useContext<IContext>(Theme);
    const [data,setData] = useState<Type<IData>>(null!);
    const [idx,setIdx] = useState<Null<number>>(call ?? null);
    const [socket,setSocket] = useState<Socket>(null!);
    const [online,setOnline] = useState<number[]>([]);
    const [state,dispatch] = useReducer(reduce<ISt,Act>,defaultState1);
  
    const toggle = useCallback((i:number)=>():void=>{
        caller(i);
        set({type:1});
      },[]);

     const setIndex = useCallback((i:number)=>():void=>setIdx(i),[]);
     
     const change = ({target}:EvtC):void => {
      if (Array.isArray(state.base)){ 
      const val:string = target.value.trim().toLocaleLowerCase()
      const newData:IData[] = state.base.filter((i:IData):Type<IData>=>{
       if (i.name.toLocaleLowerCase().indexOf(val)!==-1) return i;
       });
        dispatch({data:newData});
      };
     };

      useEffect(():void=>{
       setSocket(io("http://localhost:5000"));
       async function Prom():Promise<void>{
        return await axios.get('http://localhost:5000/user')
        .then(({data}:AxiosResponse<IData[]>):void=>{
        if (Array.isArray(data)){
          const date:Type<IData> = data.find((i:IData)=>i.id==user);
          dispatch({data:data,base:data});
          console.log(data)
          setData(date);
          };
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
  if (state.err ||!translate) return <Error back={val} />;
    return (
        <>
        <BlockInput>
          <ContactInput
           back={val}
           type="text"
           onChange={change}
           placeholder={translate('search')}
            />
        </BlockInput>
         <>
          {!id&&(
            <ProfileCard
             path={user}
             fill={`${idx==user}`}
             click={setIndex(user)}
             name={translate("Main")}
            />
           )}
         </>
        {Array.isArray(state.data)&&state.data.map(
        ({name,id:userId}:IData):Null<JSX.Element>=>{
        if (id) {
        const isOnline:Type<number> = online?.find((i:number)=>i == userId);
        console.log(state.data)
        return userId !== user ? (   
            <ProfileCard click={toggle(userId)}
             name={name} path={userId} key={userId}
             logo={name.slice(0,1).toUpperCase()}>
              <ContactTime online={`${isOnline}`}>
                {isOnline ? "online" : "offline"}
              </ContactTime>
            </ProfileCard>
          ) : null
         } else {
           const show:Type<IMessage> = getUser(userId,data,state.data);
            return show&&(userId!==user) ? (
              <ProfileCard
               key={userId}
               path={userId}
               fill={`${idx==userId}`}
               click={setIndex(userId)}
               logo={name.slice(0,1).toUpperCase()}
               name={name}
                />
             ) : null
         }})}
        </>
    )
}