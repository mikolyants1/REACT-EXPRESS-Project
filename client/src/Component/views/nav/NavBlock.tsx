import { useContext, useReducer, useState,Suspense,
LazyExoticComponent,ComponentType,lazy, startTransition} from "react";
import { NavBar, NavMain, NavWrapper, NavMenu,
 NavMenuBlock,NavTitle } from "../../../style/style.js";
import { Loader } from "../../ui/Loader.js";
import { Context, Null, SettProps,chatProps,
st2} from "../../../types/type.js";
import {useTranslation} from 'react-i18next'
import Theme from "../../helpers/Context.js";
import { defaultState3, reducer } from "../../helpers/Reducer.js";

const NavChats:LazyExoticComponent<
ComponentType<chatProps>> = lazy(()=>import("./pages/NavChats.js"));
const NavSett:LazyExoticComponent<
ComponentType<SettProps>> = lazy(()=>import("./pages/NavSett.js"));

interface prop{
 show:boolean
}

export default function NavBlock({show}:prop):JSX.Element{
 const {val} = useContext<Context>(Theme);
 const [call,setCall] = useState<Null<number>>(null);
 const [translate] = useTranslation<"translation",string>();
 const arr:string[] = ['Contacts','Chats','Settings'];
 const [title,setTitle] = useState<string>('Contacts');
 const [state,dispatch] = useReducer(reducer,defaultState3);
 const press = (i:number)=> ():void => {
 startTransition(():void=>{
  setTitle(arr[i]);
  dispatch({type:i});
  });
 };
 const {Contacts,Chats,Settings}:st2 = state;
    return (
       <NavBar back={val}
        show={`${show}`}>
         <NavTitle>
           {translate(title)}
         </NavTitle>
         <NavMain>
           <Suspense
            fallback={<Loader back={val} />}>
            {Contacts&&(
              <NavWrapper>
                <NavChats
                 set={dispatch}
                 call={call}
                 caller={setCall}
                 id={true}
                />
              </NavWrapper>
              )}
            {Chats&&(
              <NavWrapper>
                <NavChats
                 set={dispatch}
                 call={call}
                 caller={setCall}
                 id={false}
                 />
              </NavWrapper>
             )}
            {Settings&&(
              <NavWrapper>
                <NavSett
                 set={dispatch}
                 call={setCall} 
                 />
              </NavWrapper>
             )}    
           </Suspense>
         </NavMain>
         <NavMenu>
          {arr.map((item:string,i:number):JSX.Element=>(
           <NavMenuBlock press={`${state[item]}`}
             onClick={press(i)} key={item}>
              {translate(item)}
           </NavMenuBlock>
           ))}
         </NavMenu>
       </NavBar>
    );
};
