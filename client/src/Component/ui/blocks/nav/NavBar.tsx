import {Dispatch,memo, SetStateAction,
 Suspense, lazy, useContext } from "react"
import { NavMain, NavWrapper } from "../../../../style/style.js"
import Loader from "../load/Loader.js"
import { IContext, Lazy, Null, ISettProps, IAction2,
chatProps, St2 } from "../../../../types/type.js";
import Theme from "../../../helpers/Context.js";

const NavChats:Lazy<chatProps> = lazy(()=>import("../../../views/nav/pages/NavChats.js"));
const NavSett:Lazy<ISettProps> = lazy(()=>import("../../../views/nav/pages/NavSett.js"));

interface props {
    call:Null<number>,
    setCall:Dispatch<SetStateAction<Null<number>>>,
    state:St2,
    dispatch:Dispatch<IAction2>
}

function NavBar({setCall,state,call,dispatch}:props):JSX.Element {
const {val} = useContext<IContext>(Theme);
const {Contacts,Chats,Settings}:St2 = state;
  return (
    <NavMain>
      <Suspense
       fallback={<Loader back={val} />}>
       {Contacts&&(
         <NavWrapper>
           <NavChats
            set={dispatch}
            call={call}
            caller={setCall}
            id
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
  );
};

export default memo(NavBar);