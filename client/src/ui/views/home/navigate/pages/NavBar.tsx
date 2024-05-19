import {Dispatch,memo, SetStateAction,
 Suspense, lazy, useContext } from "react"
import { NavMain, NavWrapper } from "../../../../../libs/style/style.js"
import { IContext, TLazy, TNull, ISettProps, INavAction,
IChatProps, TNavState} from "../../../../../libs/types/type.js";
import Loader from "../../../../../ui/cards/loading/Loader.js";
import { AppContext } from "../../../../../model/context/AppContext.js";

const NavChats:TLazy<IChatProps> = lazy(()=>import("./chats/NavChats.js"));
const NavSettings:TLazy<ISettProps> = lazy(()=>import("./settings/NavSettings.js"));

interface IProps {
    call:TNull<number>,
    setCall:Dispatch<SetStateAction<TNull<number>>>,
    state:TNavState,
    dispatch:Dispatch<INavAction>
}

function NavBar({setCall,state,call,dispatch}:IProps):JSX.Element {
const {theme} = useContext<IContext>(AppContext);
  return (
    <NavMain>
      <Suspense
       fallback={<Loader back={theme} />}>
       {state.Contacts && (
         <NavWrapper>
           <NavChats
            set={dispatch}
            call={call}
            caller={setCall}
            id
            />
          </NavWrapper>
        )}
       {state.Chats && (
         <NavWrapper>
           <NavChats
            set={dispatch}
            call={call}
            caller={setCall}
            id={false}
            />
         </NavWrapper>
        )}
       {state.Settings && (
         <NavWrapper>
           <NavSettings
            set={dispatch}
            call={setCall} 
            />
         </NavWrapper>
        )}    
      </Suspense>
    </NavMain>
  );
}

export default memo(NavBar);