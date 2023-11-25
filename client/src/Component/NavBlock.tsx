import { useContext, useReducer, useState,Suspense,
LazyExoticComponent,ComponentType,lazy} from "react";
import { NavBar, NavMain, NavMenu, NavMenuBlock,
 NavTitle } from "../style/style.js";
import { Theme } from "./Page.js";
import { Loader } from "./Loader.js";
import { Context, Null, SettProps, action1,
   chatProps } from "../types/type.js";

const NavChats:LazyExoticComponent<
ComponentType<chatProps>> = lazy(()=>import("./NavChats.js"));
const NavSett:LazyExoticComponent<
ComponentType<SettProps>> = lazy(()=>import("./NavSett.js"));

interface prop{
 show:boolean
}
type state = Record<string,boolean>

export default function NavBlock({show}:prop):JSX.Element{
 const {val} = useContext<Context>(Theme);
 const [call,setCall] = useState<Null<number>>(null);
 const arr:string[] = ['Contacts','Chats','Settings'];
 const [title,setTitle] = useState<string>('Contacts');
 const [state,dispatch] = useReducer(reducer, 
 {Contacts:true,Chats:false,Settings:false});
 function reducer(state:state,action:action1):state{
  setTitle(arr[action.type]);
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
      return state
   };
 };
 const {Contacts,Chats,Settings}:state = state;
    return (
       <NavBar back={val}
        show={`${show}`}>
         <NavTitle>
           {title}
         </NavTitle>
         <NavMain>
           <Suspense fallback={<Loader back={val} />}>
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
           </Suspense>
         </NavMain>
         <NavMenu>
          {arr.map((item:string,i:number):JSX.Element=>(
           <NavMenuBlock key={i} press={`${state[item]}`}
             onClick={()=>dispatch({type:i})}>
              {item}
           </NavMenuBlock>
           ))}
         </NavMenu>
       </NavBar>
    );
};
