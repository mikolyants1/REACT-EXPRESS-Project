import { BlockInput, ContactInput, ContactTime} from "../../../../../../libs/style/style.js"
import { useCallback, useContext, useEffect, useReducer, useState} from "react"
import { AxiosResponse } from "axios"
import { IContext, TEvtC, TNull, Type,TChatAction,IChatProps,IData, IMessage, IChatState} from "../../../../../../libs/types/index.js"
import ProfileCard from "./cards/ProfileCard.js"
import {io,Socket} from 'socket.io-client';
import Loader from "../../../../../../ui/cards/loading/Loader.js"
import Error from "../../../../../../ui/cards/loading/Error.js"
import getUser from "../../../../../../model/functions/get/GetUser.js"
import { HomeReducer } from "../../../../../../model/reducers/home.js"
import { ChatDefState } from "../../../../../../libs/defaultStates/ChatDefState.js"
import { AppContext } from "../../../../../../model/context/AppContext.js"
import { baseUrl } from "@/api/baseUrl.js"

export default function NavChats({set,id,call,caller}:IChatProps):JSX.Element{
  const {user,theme,translate} = useContext<IContext>(AppContext);
  const [data,setData] = useState<Type<IData>>(null!);
  const [idx,setIdx] = useState<TNull<number>>(call ?? null);
  const [socket,setSocket] = useState<Socket>(null!);
  const [online,setOnline] = useState<number[]>([]);
  const [state,dispatch] = useReducer(
    HomeReducer<IChatState,TChatAction>,
    ChatDefState
  );
  
  const toggle = useCallback((i:number)=>():void=>{
    caller(i);
    set({type:1});
  },[]);

  const setIndex = useCallback((i:number)=>():void=>setIdx(i),[]);
     
  const change = ({target}:TEvtC):void => {
    if (Array.isArray(state.base)){ 
      const val:string = target.value.trim().toLocaleLowerCase();
      const newData:IData[] = state.base.filter((i:IData) => (
        i.name.toLocaleLowerCase().indexOf(val) !== -1
      ));
      dispatch({data:newData});
    }
  };

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    baseUrl.get('/user')
    .then(({data}:AxiosResponse<IData[]>) => {
      if (Array.isArray(data)){
        const date:Type<IData> = data.find(u => u.id == user);
        dispatch({data,base:data});
        setData(date);
      }
    })
    .catch(()=>dispatch({err:true}))
    .finally(()=>dispatch({load:false}));
  },[user]);

  useEffect(():void=>{ 
    socket?.emit("join",user);
    socket?.on("online",setOnline);
  },[socket, user]);

  if (state.load) return <Loader back={theme} />;
  if (state.err || !translate) return <Error back={theme} />;
    return (
        <>
        <BlockInput>
          <ContactInput
           back={theme}
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
        ({name,id:userId}:IData):TNull<JSX.Element> => {
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
             return show&&(userId !== user) ? (
              <ProfileCard
               key={userId}
               path={userId}
               fill={`${idx == userId}`}
               click={setIndex(userId)}
               logo={name.slice(0,1).toUpperCase()}
               name={name}
              />
             ) : null
         }})}
        </>
    )
}