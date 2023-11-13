import { useContext, useReducer, useState } from "react";
import { NavBar, NavMain, NavMenu, NavMenuBlock,
 NavTitle } from "../style/style.js";
import { Context, Theme } from "./Page.js";
import { NavChats } from "./NavChats.js";
import { NavSett } from "./NavSett.js";
import { Null } from "./Main.js";

interface prop{
 show:boolean
}
type state = Record<string,boolean>

export interface action{
  type:number
}
export default function NavBlock({show}:prop):JSX.Element{
 const {val} = useContext<Context>(Theme)
 const [call,setCall] = useState<Null<number>>(null)
 const arr:string[] = ['Contacts','Chats','Settings']
 const [title,setTitle] = useState<string>('Contacts')
 const [state,dispatch] = useReducer(reducer,
 {Contacts:true,Chats:false,Settings:false})
 function reducer(state:state,action:action):state{
   setTitle(arr[action.type])
    switch (action.type) {
        case 0:
         return {
            Contacts:true,
            Chats:false,
            Settings:false
            };
        case 1:
         return {
            Contacts:false,
            Chats:true,
            Settings:false
            };
        case 2:
         return {
            Contacts:false,
            Chats:false,
            Settings:true
            };
        default:
          return state;
    }
 }
 const {Contacts,Chats,Settings}:state = state
    return (
       <NavBar back={val}
        show={`${show}`}>
         <NavTitle>
           {title}
         </NavTitle>
         <NavMain>
          {Contacts&&(
            <NavChats
             set={dispatch}
             call={call}
             caller={setCall}
             id={true}
              />
           )}
          {Chats&&(
           <NavChats
           set={dispatch}
           call={call}
           caller={setCall}
           id={false}
            />
           )}
          {Settings&&(
            <NavSett
             set={dispatch}
             call={setCall} 
             />
           )}
         </NavMain>
         <NavMenu>
          {arr.map((item:string,i:number):JSX.Element=>(
            <NavMenuBlock key={i}
             press={state[item]}
             onClick={()=>dispatch({type:i})}>
                {item}
            </NavMenuBlock>
           ))}
         </NavMenu>
       </NavBar>
    )
}
