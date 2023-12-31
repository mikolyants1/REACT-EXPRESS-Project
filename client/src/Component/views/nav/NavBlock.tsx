import { useContext, useReducer, useState,
 startTransition, useMemo} from "react";
import { NavBarBlock, NavMain, NavMenu,
NavMenuBlock,NavTitle } from "../../../style/style.js";
import { Context, Null,st2} from "../../../types/type.js";
import Theme from "../../helpers/Context.js";
import { defaultState3, reducer } from "../../helpers/Reducer.js";
import NavBar from "../../ui/blocks/NavBar.js";
import Error from "../../ui/blocks/load/Error.js";

interface prop{
 show:boolean
};

export default function NavBlock({show}:prop):JSX.Element{
 const {val,translate} = useContext<Context>(Theme);
 const [call,setCall] = useState<Null<number>>(null);
 const arr:string[] = ['Contacts','Chats','Settings'];
 const [title,setTitle] = useState<string>('Contacts');
 const [state,dispatch] = useReducer(reducer,defaultState3);
 const memoState:st2 = useMemo(()=>state,[state]);
 const press = (i:number)=> ():void => {
  startTransition(():void=>{
   setTitle(arr[i]);
   dispatch({type:i});
  });
 };

 if (!translate) return <Error back={val} />;
    return (
       <NavBarBlock back={val}
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
};
