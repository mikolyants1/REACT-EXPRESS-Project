import { useContext, useReducer, useState,
startTransition, useMemo} from "react";
import { NavBarBlock, NavMain, NavMenu,
NavMenuBlock,NavTitle } from "../../../../libs/style/style.js";
import { IContext, TNull,TNavState} from "../../../../libs/types/type.js";
import { NavReducer } from "../../../../model/reducers/nav.js";
import { navDefState } from "../../../../libs/defaultStates/NavDefState.js";
import { AppContext } from "../../../../model/context/AppContext.js";
import Error from "../../../../ui/cards/loading/Error.js";
import NavBar from "./pages/NavBar";

interface prop {
 show:boolean
}

export default function NavBlock({show}:prop):JSX.Element{
 const {theme,translate} = useContext<IContext>(AppContext);
 const [call,setCall] = useState<TNull<number>>(null);
 const arr:string[] = ['Contacts','Chats','Settings'];
 const [title,setTitle] = useState<string>('Contacts');
 const [state,dispatch] = useReducer(NavReducer,navDefState);
 const memoState:TNavState = useMemo(() => state,[state]);
 
 const press = (i:number)=> ():void => {
  startTransition(():void=>{
    setTitle(arr[i]);
    dispatch({type:i});
  });
 }

 if (!translate) return <Error back={theme} />;
    return (
       <NavBarBlock back={theme}
        show={`${show}`}>
         <NavTitle>
           {translate(title)}
         </NavTitle>
         <NavMain>
           <NavBar
            setCall={setCall}
            call={call}
            dispatch={dispatch}
            state={memoState}
           />
         </NavMain>
         <NavMenu>
          {arr.map((item:string,i:number):JSX.Element=>(
           <NavMenuBlock press={`${state[item]}`}
             onClick={press(i)} key={item}>
              {translate(item)}
           </NavMenuBlock>
           ))}
         </NavMenu>
       </NavBarBlock>
    );
}
